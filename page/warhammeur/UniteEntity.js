class WarhammerModels {
    constructor(xmlData) {
        this.units = this.parseXML(xmlData);
        this.detachments = this.parseDetachments(xmlData);
        this.enhancements = this.parseEnhancements(xmlData); // New: Parse enhancements
        this.selectedUnits = this.loadFromCookie();
        if (!Array.isArray(this.selectedUnits)) {
            console.warn("selectedUnits is not an array, default initialization.");
            this.selectedUnits = [];
        }
        this.currentUser = null;
        this.currentArmy = null;
        this.populateUnitSelector();
        this.initEventListeners();
        this.displaySelectedUnits();
        this.initDetachmentInfoPopup();
    }

    // Parse detachments from XML
    parseDetachments(xml) {
        let detachments = [];
        $(xml).find('selectionEntryGroup[name="Detachment"] selectionEntry').each(function () {
            const $entry = $(this);
            const detachment = {
                id: $entry.attr('id'),
                name: $entry.attr('name'),
                rules: []
            };

            // Extract associated rules via infoLinks
            $entry.find('infoLink[type="rule"]').each(function () {
                const ruleId = $(this).attr('targetId');
                const $rule = $(xml).find(`rule[id="${ruleId}"]`);
                if ($rule.length) {
                    detachment.rules.push({
                        name: $rule.attr('name'),
                        description: $rule.find('description').text()
                    });
                }
            });

            detachments.push(detachment);
            console.log("Parsed detachment:", detachment);
        });
        return detachments;
    }
    // Initialize detachment info popup
    initDetachmentInfoPopup() {
        // Button to open the popup
        $("#viewDetachmentsBtn").on("click", () => {
            this.populateDetachmentInfoPopup();
            $("#detachmentInfoPopup").show();
        });

        // Button to close the popup
        $("#closeDetachmentInfoPopupBtn").on("click", () => {
            $("#detachmentInfoPopup").hide();
        });

        // Handle accordion toggle
        $("#detachmentAccordion").on("click", ".accordion-header", function () {
            const $header = $(this);
            const $content = $header.next(".accordion-content");
            const isOpen = $content.is(":visible");

            // Close all other accordion items
            $("#detachmentAccordion .accordion-content").slideUp();
            $("#detachmentAccordion .accordion-header").removeClass("active");

            // Toggle the clicked item
            if (!isOpen) {
                $content.slideDown();
                $header.addClass("active");
            }
        });
    }
    // Populate the detachment info popup
    populateDetachmentInfoPopup() {
        const $accordion = $("#detachmentAccordion").empty();

        // Populate detachments in accordion
        this.detachments.forEach(detachment => {
            // Filter enhancements for this detachment
            const availableEnhancements = this.enhancements.filter(enh => {
                // Show enhancement if it has no detachment restrictions or is linked to this detachment
                return enh.linkedDetachmentIds.length === 0 || enh.linkedDetachmentIds.includes(detachment.id);
            });

            const $detachmentItem = $(`
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3 class="type-header collapsed" aria-expanded="false">
                        ${detachment.name}
                        <span class="toggle-icon">▶</span>
                        </h3>
                    </div>
                    <div class="accordion-content" style="display: none;">
                        <h4>Règles</h4>
                        ${detachment.rules.length > 0 ? detachment.rules.map(rule => `
                            <div class="rule">
                                <strong>${rule.name} :</strong> ${rule.description}
                            </div>
                        `).join('') : '<p>Aucune règle disponible.</p>'}
                        <h4>Améliorations</h4>
                        ${availableEnhancements.length > 0 ? availableEnhancements.map(enh => `
                            <div class="enhancement">
                                <strong>${enh.name} (${enh.cost} pts) :</strong> ${enh.description}
                                ${enh.restrictions.length > 0 ? `
                                    <p><em>Restrictions : ${enh.restrictions.join(', ')}</em></p>
                                ` : ''}
                            </div>
                        `).join('') : '<p>Aucune amélioration disponible.</p>'}
                    </div>
                </div>
            `);
            $accordion.append($detachmentItem);
        });
    }
    // Parse enhancements from XML
    parseEnhancements(xml) {
        let enhancements = [];
        $(xml).find('selectionEntryGroup[name="Enhancements"] selectionEntry').each(function () {
            const $entry = $(this);
            const enhancement = {
                id: $entry.attr('id'),
                name: $entry.attr('name'),
                cost: parseInt($entry.find('cost[name="pts"]').attr('value') || '0', 10),
                description: $entry.find('profile[typeName="Abilities"] characteristic[name="Description"]').text() || 'Aucune description',
                restrictions: [], // Store model restrictions (e.g., NECRONS, CRYPTEK)
                linkedDetachmentIds: [] // Store detachment IDs that allow this enhancement
            };

            // Extract restrictions from description
            const desc = enhancement.description.toLowerCase();
            if (desc.includes('necrons model only')) enhancement.restrictions.push('NECRONS');
            if (desc.includes('cryptek model only')) enhancement.restrictions.push('CRYPTEK');
            if (desc.includes('overlord model only')) enhancement.restrictions.push('OVERLORD');
            if (desc.includes('destroyer cult model only')) enhancement.restrictions.push('DESTROYER CULT');

            // Extract linked detachment IDs from modifier conditions
            $entry.find('modifier[field="hidden"] condition').each(function () {
                const childId = $(this).attr('childId');
                if (childId) {
                    enhancement.linkedDetachmentIds.push(childId);
                }
            });

            enhancements.push(enhancement);
            console.log("Parsed enhancement:", enhancement);
        });
        return enhancements;
    }

    // Initialize detachment and enhancement popup
    initDetachmentPopup() {
        // Button to open the popup
        $("#openDetachmentPopupBtn").on("click", () => {
            this.populateDetachmentPopup();
            $("#detachmentPopup").show();
        });

        // Button to close the popup
        $("#closeDetachmentPopupBtn").on("click", () => {
            $("#detachmentPopup").hide();
        });

        // Button to apply selections
        $("#applyDetachmentBtn").on("click", () => {
            this.applyDetachmentAndEnhancements();
            $("#detachmentPopup").hide();
        });

        // Handle detachment radio button change
        $("#detachmentList").on("change", ".detachment-radio", (e) => {
            const detachmentId = $(e.target).val();
            this.populateEnhancementsList(detachmentId);
        });

        // Handle enhancement checkbox changes
        $("#enhancementList").on("change", ".enhancement-checkbox", (e) => {
            const $checkbox = $(e.target);
            const enhancementId = $checkbox.val();
            const isChecked = $checkbox.is(":checked");

            if (isChecked) {
                const enhancement = this.enhancements.find(e => e.id === enhancementId);
                if (this.selectedEnhancements.length >= 3) {
                    alert("You can select a maximum of 3 enhancements per army.");
                    $checkbox.prop("checked", false);
                    return;
                }
                if (this.selectedEnhancements.some(e => e.id === enhancementId)) {
                    alert("This enhancement is already selected.");
                    $checkbox.prop("checked", false);
                    return;
                }
                this.selectedEnhancements.push(enhancement);
            } else {
                this.selectedEnhancements = this.selectedEnhancements.filter(e => e.id !== enhancementId);
            }

            console.log("Selected enhancements:", this.selectedEnhancements);
        });
    }

    // Populate the detachment and enhancement popup
    populateDetachmentPopup() {
        const $detachmentList = $("#detachmentList").empty();
        const $enhancementList = $("#enhancementList").empty();

        // Populate detachments
        this.detachments.forEach(detachment => {
            const isChecked = this.selectedDetachment && this.selectedDetachment.id === detachment.id;
            const $detachmentItem = $(`
                <div class="detachment-item">
                    <label>
                        <input type="radio" class="detachment-radio" name="detachment" value="${detachment.id}" ${isChecked ? 'checked' : ''}>
                        <strong>${detachment.name}</strong>
                    </label>
                    <div class="detachment-rules">
                        <h4>Rules</h4>
                        ${detachment.rules.length > 0 ? detachment.rules.map(rule => `
                            <div class="rule">
                                <strong>${rule.name}:</strong> ${rule.description}
                            </div>
                        `).join('') : '<p>No rules available.</p>'}
                    </div>
                </div>
            `);
            $detachmentList.append($detachmentItem);
        });

        // Populate enhancements for the selected detachment (if any)
        if (this.selectedDetachment) {
            this.populateEnhancementsList(this.selectedDetachment.id);
        } else if (this.detachments.length > 0) {
            // Default to first detachment
            $(`input.detachment-radio[value="${this.detachments[0].id}"]`).prop("checked", true);
            this.populateEnhancementsList(this.detachments[0].id);
        }
    }

    // Populate enhancements list based on detachment
    populateEnhancementsList(detachmentId) {
        const $enhancementList = $("#enhancementList").empty();
        const detachment = this.detachments.find(d => d.id === detachmentId);
        if (!detachment) return;

        // Filter enhancements based on detachment-specific constraints
        const availableEnhancements = this.enhancements.filter(enh => {
            const $xmlEnh = $(`selectionEntry[id="${enh.id}"]`);
            const $modifier = $xmlEnh.find('modifier[field="hidden"] condition');
            if ($modifier.length === 0) return true;
            const childId = $modifier.attr('childId');
            return childId === detachmentId || !$modifier.attr('childId'); // Show if no restriction or matches detachment
        });

        if (availableEnhancements.length === 0) {
            $enhancementList.append('<p>No enhancements available for this detachment.</p>');
            return;
        }

        availableEnhancements.forEach(enh => {
            const isChecked = this.selectedEnhancements.some(e => e.id === enh.id);
            const $enhancementItem = $(`
                <div class="enhancement-item">
                    <label>
                        <input type="checkbox" class="enhancement-checkbox" value="${enh.id}" ${isChecked ? 'checked' : ''}>
                        <strong>${enh.name} (${enh.cost} pts)</strong>
                    </label>
                    <p>${enh.description}</p>
                    ${enh.restrictions.length > 0 ? `
                        <p><strong>Restrictions:</strong> ${enh.restrictions.join(', ')}</p>
                    ` : ''}
                </div>
            `);
            $enhancementList.append($enhancementItem);
        });
    }

    // Apply selected detachment and enhancements
    applyDetachmentAndEnhancements() {
        const selectedDetachmentId = $("input.detachment-radio:checked").val();
        if (selectedDetachmentId) {
            this.selectedDetachment = this.detachments.find(d => d.id === selectedDetachmentId);
            console.log("Selected detachment:", this.selectedDetachment);
        } else {
            this.selectedDetachment = null;
            console.log("No detachment selected.");
        }

        this.displaySelectedUnits(); // Refresh to show detachment/enhancements
        this.saveToCookie();
    }

    addToSelectedUnits(unit, selectedWeapons, selectedAbilities) {
        const defaultCostSteps = unit.costSteps && unit.costSteps.length > 0 
            ? unit.costSteps 
            : [{ models: unit.minModels || 1, cost: parseInt(unit.cost || '0', 10) }];

        const newUnit = {
            ...unit,
            selectedWeapons: selectedWeapons || [],
            selectedAbilities: selectedAbilities || unit.abilities,
            infoLinks: unit.infoLinks || [], // Conserver les infoLinks
            modelCount: unit.minModels || 1,
            costSteps: defaultCostSteps
        };
        this.selectedUnits.push(newUnit);
        console.log("Unités après ajout :", this.selectedUnits);
        this.displaySelectedUnits();
        this.saveToCookie();
    }
    

    changeModelCount(index, direction) {
        const unit = this.selectedUnits[index];
        
        // Trouver l'index actuel dans les paliers
        const currentStepIndex = unit.costSteps.findIndex(step => step.models === unit.modelCount);
        const newStepIndex = currentStepIndex + direction;
    
        // Vérifier si le nouveau palier est valide
        if (newStepIndex >= 0 && newStepIndex < unit.costSteps.length) {
            unit.modelCount = unit.costSteps[newStepIndex].models;
            this.displaySelectedUnits();
            this.saveToCookie(); 
        } else {
            const stepsText = unit.costSteps.map(step => `${step.models} modèles (${step.cost} pts)`).join(', ');
            alert(`Le nombre de modèles doit être parmi : ${stepsText}`);
        }
    }


    // Nouvelle méthode pour supprimer une unité
    removeUnit(index) {
        this.selectedUnits.splice(index, 1); // Supprime l'unité à l'index spécifié
        this.displaySelectedUnits(); // Rafraîchit l'affichage
        this.saveToCookie();
    }

    initEventListeners() {
        // Gérer l'ouverture du popup
        $("#openUnitPopupBtn").on("click", () => {
            $("#unitPopup").show();
            this.populateUnitSelector();
        });

        // Gérer la fermeture du popup
        $("#closeUnitPopupBtn").on("click", () => {
            $("#unitPopup").hide();
        });

        // Gérer l'ajout d'une unité depuis le popup
        $("#unitList").on("click", ".add-unit-btn", (e) => {
            const unitId = $(e.target).data("unit-id");
            const selectedUnit = this.units.find(unit => unit.id === unitId);
            if (selectedUnit) {
                const selectedWeapons = selectedUnit.weapons.filter(weapon =>
                    $(`#weaponSelection .weapon-checkbox[value="${weapon.name}"]`).is(":checked")
                );
                const selectedAbilities = selectedUnit.abilities.filter(ability =>
                    $(`#abilitySelection .ability-checkbox[value="${ability.name}"]`).is(":checked")
                );
                this.addToSelectedUnits(selectedUnit, selectedWeapons, selectedAbilities);
            }
        });

        // Gérer l'ajout d'une unité depuis les détails (bouton "Ajouter à ma liste")
        $("#unitDetails").on("click", "#addToListBtn", () => {
            const selectedUnit = this.units.find(unit => unit.id === $("#unitSelector").val() || $(`.unit-item[data-unit-id]`).data("unit-id"));
            if (selectedUnit) {
                const selectedWeapons = selectedUnit.weapons.filter(weapon =>
                    $(`#weaponSelection .weapon-checkbox[value="${weapon.name}"]`).is(":checked")
                );
                const selectedAbilities = selectedUnit.abilities.filter(ability =>
                    $(`#abilitySelection .ability-checkbox[value="${ability.name}"]`).is(":checked")
                );
                this.addToSelectedUnits(selectedUnit, selectedWeapons, selectedAbilities);
            }
        });
    }



    toggleUnitDetails(index) {
        const $unitDiv = $(`#selectedUnitsList .selected-unit[data-index="${index}"]`);
        const unit = this.selectedUnits[index];

        const renderUnitDetails = () => {
            const characteristics = Object.entries(unit.characteristics);
            return `
                <div class="unit-details">
                    <h4>Caractéristiques</h4>
                    <table class="stats-table">
                        <tr>
                            ${characteristics.map(([key]) => `<th>${key}</th>`).join('')}
                        </tr>
                        <tr>
                            ${characteristics.map(([, value]) => `<td>${value}</td>`).join('')}
                        </tr>
                    </table>

                    <!-- Section pour les catégories -->
                    ${unit.categories && unit.categories.length > 0 ? `
                        <h4>Catégories</h4>
                        <p>${unit.categories.map(category => `<span>${category}</span>`).join('/')}<p>
                    ` : '<p>Aucune catégorie disponible.</p>'}

                    <!-- Section pour les règles (infoLinks) -->
                    ${unit.infoLinks && unit.infoLinks.length > 0 ? `
                        <h4>Règles</h4>
                        ${unit.infoLinks.map(rule => `<span>${rule}</span>`).join('/')}
                    ` : '<p>Aucune règle disponible.</p>'}

                    <!-- Section pour toutes les capacités -->
                    ${unit.abilities && unit.abilities.length > 0 ? `
                        <h4>Capacités</h4>
                        <ul>${unit.abilities.map(ability => `<li><strong>${ability.name}:</strong> ${ability.description}</li>`).join('')}</ul>
                    ` : '<p>Aucune capacité disponible.</p>'}

                    <!-- Section pour selected abilities -->
                    ${unit.selectedAbilities && unit.selectedAbilities.length > 0 ? `
                        <h4>Capacités sélectionnées</h4>
                        <ul>${unit.selectedAbilities.map(ability => `<li><strong>${ability.name}:</strong> ${ability.description}</li>`).join('')}</ul>
                    ` : ''}

                    <!-- Section pour weapon selection -->
                    <div class="weapon-selection">
                        <h4>Armes possibles</h4>
                        <form class="weapon-selection-form">
                            ${unit.weapons && unit.weapons.length > 0 ? unit.weapons.map(weapon => `
                                <label class="weapon-label">
                                    <input type="checkbox" class="weapon-checkbox" value="${weapon.name}" data-index="${index}" data-weapon-name="${weapon.name}" ${unit.selectedWeapons.some(w => w.name === weapon.name) ? 'checked' : ''}>
                                    <strong>${weapon.name}</strong>
                                </label>
                                <div class="weapon-stats" style="display: none;">
                                    ${weapon.profiles.map(profile => `
                                        <table class="stats-table">
                                            <tr>
                                                <th>Type</th>
                                                <th>Range</th>
                                                <th>A</th>
                                                <th>WS/BS</th>
                                                <th>S</th>
                                                <th>AP</th>
                                                <th>D</th>
                                                <th>Keywords</th>
                                            </tr>
                                            <tr>
                                                <td>${profile.type}</td>
                                                <td>${profile.characteristics["Range"] || "-"}</td>
                                                <td>${profile.characteristics["A"] || "-"}</td>
                                                <td>${profile.characteristics[profile.type === "Melee Weapons" ? "WS" : "BS"] || "-"}</td>
                                                <td>${profile.characteristics["S"] || "-"}</td>
                                                <td>${profile.characteristics["AP"] || "-"}</td>
                                                <td>${profile.characteristics["D"] || "-"}</td>
                                                <td>${profile.characteristics["Keywords"] || "-"}</td>
                                            </tr>
                                        </table>
                                    `).join('')}
                                    ${weapon.abilities.length > 0 ? `
                                        <ul>${weapon.abilities.map(ability => `<li><strong>${ability.name}:</strong> ${ability.description}</li>`).join('')}</ul>
                                    ` : ''}
                                </div>
                            `).join('') : '<p>Aucune arme disponible.</p>'}
                        </form>
                    </div>
                </div>
            `;
        };

        if ($unitDiv.hasClass("expanded")) {
            $unitDiv.find(".unit-details").slideUp(200, () => {
                $unitDiv.removeClass("expanded");
                $unitDiv.find(".unit-details").remove();
            });
        } else {
            $unitDiv.addClass("expanded");
            const $details = $(renderUnitDetails());
            $unitDiv.append($details);
            $unitDiv.find(".unit-details").hide().slideDown(200);
            $unitDiv.find(".weapon-checkbox:checked").trigger("change");
        }
    }

    displaySelectedUnits() {
        const $selectedUnitsList = $("#selectedUnitsList").empty();

        this.selectedUnits.forEach((unit, index) => {
            const costSteps = unit.costSteps && unit.costSteps.length > 0 
                ? unit.costSteps 
                : [{ models: unit.modelCount || 1, cost: parseInt(unit.cost || '0', 10) }];
            
            const currentStep = costSteps.find(step => step.models === unit.modelCount) || costSteps[0];
            const totalCost = currentStep.cost;

            const hasModelVariation = unit.minModels !== unit.maxModels && unit.costSteps.length > 1;

            const $unitDiv = $(`
                <div class="selected-unit" data-index="${index}" style="${unit.backgroundColor ? `background-color: ${unit.backgroundColor};` : ''}">
                    <button class="down-button" ${index === this.selectedUnits.length - 1 ? 'disabled' : ''}>↓</button>
                    <button class="up-button" ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button class="option-button">⚙️</button>
                    <div class="sub-options" style="display: none;">
                        <button class="sub-option sub-option-1" data-index="${index}" title="Marquer comme mort">☠️</button>
                        <button class="sub-option sub-option-2" data-index="${index}" title="Dupliquer l'unité">📋</button>
                        <input type="color" class="sub-option sub-option-3" data-index="${index}" title="Changer la couleur" value="${unit.backgroundColor || '#ffffff'}">
                    </div>
                    <div class="selected-unit-header">
                        <div class="flex">
                            <img class="unit-illustration" width="100px" height="100px" src="${unit.imageUrl}" alt="Unité Nécron ${unit.name} pour Warhammer">
                            <div class="skibidibapbap">
                                <button class="remove-unit-btn" data-index="${index}">Supprimer</button>
                                <h3>${unit.name} - ${totalCost} pts${hasModelVariation ? ` (${unit.modelCount} modèles)` : ''}</h3>
                            </div>
                        </div>
                        ${hasModelVariation ? `
                            <div class="button-container">
                                <button class="increase-model-btn" data-index="${index}">+</button>
                                <button class="decrease-model-btn" data-index="${index}">-</button>
                            </div>
                        ` : `
                            <div class="button-container" style="opacity: 0;">
                                <button class="increase-model-btn" disabled>+</button>
                                <button class="decrease-model-btn" disabled>-</button>
                            </div>
                        `}
                    </div>
                </div>
            `);
            $selectedUnitsList.append($unitDiv);

            // Event listener for unit details toggle (excluding clicks on buttons and .weapon-selection)
            $unitDiv.on("click", (e) => {
                if (!$(e.target).is("button") && !$(e.target).closest(".sub-options").length && !$(e.target).closest(".weapon-selection").length) {
                    this.toggleUnitDetails(index);
                }
            });

            // Event listener for option button toggle
            $unitDiv.find(".option-button").on("click", (e) => {
                e.stopPropagation();
                const $subOptions = $unitDiv.find(".sub-options");
                console.log("Bouton d'options cliqué, sub-options visible ?", $subOptions.is(":visible"));
                if ($subOptions.is(":visible")) {
                    $subOptions.fadeOut(200);
                } else {
                    $subOptions.fadeIn(200);
                }
            });

            // Event listener for removing a unit
            $unitDiv.find(".remove-unit-btn").on("click", (e) => {
                e.stopPropagation();
                this.removeUnit(index);
            });

            // Event listeners for model count buttons (if applicable)
            if (hasModelVariation) {
                $unitDiv.find(".decrease-model-btn").on("click", (e) => {
                    e.stopPropagation();
                    this.changeModelCount(index, -1);
                });
                $unitDiv.find(".increase-model-btn").on("click", (e) => {
                    e.stopPropagation();
                    this.changeModelCount(index, 1);
                });
            }

            // Event listener for moving unit up
            $unitDiv.find(".up-button").on("click", (e) => {
                e.stopPropagation();
                if (index > 0) {
                    // Ajouter la classe d'animation
                    $unitDiv.addClass("moving-up");
                    $(`#selectedUnitsList .selected-unit[data-index="${index - 1}"]`).addClass("moving-down");

                    // Attendre la fin de l'animation avant de réorganiser
                    setTimeout(() => {
                        // Échanger les unités
                        [this.selectedUnits[index], this.selectedUnits[index - 1]] = 
                            [this.selectedUnits[index - 1], this.selectedUnits[index]];
                        this.displaySelectedUnits(); // Rafraîchir l'affichage
                        this.saveToCookie(); // Sauvegarder l'ordre
                        console.log(`Unité ${unit.name} déplacée vers le haut (index ${index} -> ${index - 1})`);
                    }, 300); // Correspond à la durée de la transition (0.3s)
                }
            });

            // Event listener for moving unit down
            $unitDiv.find(".down-button").on("click", (e) => {
                e.stopPropagation();
                if (index < this.selectedUnits.length - 1) {
                    // Ajouter la classe d'animation
                    $unitDiv.addClass("moving-down");
                    $(`#selectedUnitsList .selected-unit[data-index="${index + 1}"]`).addClass("moving-up");

                    // Attendre la fin de l'animation avant de réorganiser
                    setTimeout(() => {
                        // Échanger les unités
                        [this.selectedUnits[index], this.selectedUnits[index + 1]] = 
                            [this.selectedUnits[index + 1], this.selectedUnits[index]];
                        this.displaySelectedUnits(); // Rafraîchir l'affichage
                        this.saveToCookie(); // Sauvegarder l'ordre
                        console.log(`Unité ${unit.name} déplacée vers le bas (index ${index} -> ${index + 1})`);
                    }, 300); // Correspond à la durée de la transition (0.3s)
                }
            });

            // Event listener for sub-option 1: Apply opacity filter (mark as dead)
            $unitDiv.find(".sub-option-1").on("click", (e) => {
                e.stopPropagation();
                const $unitCard = $(`#selectedUnitsList .selected-unit[data-index="${index}"]`);
                const currentOpacity = parseFloat($unitCard.css("opacity")) || 1;
                if (currentOpacity === 1) {
                    $unitCard.css({
                        opacity: "0.5",
                        filter: "grayscale(80%)"
                    });
                } else {
                    $unitCard.css({
                        opacity: "1",
                        filter: "none"
                    });
                }
                console.log(`Applied dead effect to unit ${index}`);
            });

            // Event listener for sub-option 2: Duplicate unit
            $unitDiv.find(".sub-option-2").on("click", (e) => {
                e.stopPropagation();
                const unitToDuplicate = this.selectedUnits[index];
                const duplicatedUnit = { ...unitToDuplicate };
                this.selectedUnits.splice(index + 1, 0, duplicatedUnit);
                this.displaySelectedUnits();
                this.saveToCookie();
                console.log(`Unit ${unitToDuplicate.name} duplicated at index ${index + 1}`);
            });

            $unitDiv.find(".sub-option-3").on("click", (e) => {
                e.stopPropagation();
            });

            // Event listener for sub-option 3: Apply selected color directly
            $unitDiv.find(".sub-option-3").on("input", (e) => {
                e.stopPropagation();
                const selectedColor = e.target.value;
                const $unitCard = $(`#selectedUnitsList .selected-unit[data-index="${index}"]`);
                $unitCard.css("background-color", selectedColor);
                this.selectedUnits[index].backgroundColor = selectedColor;
                this.saveToCookie();
                console.log(`Applied color ${selectedColor} to unit ${index}`);
            });
        });

        // Update total points
        const totalPoints = this.selectedUnits.reduce((sum, unit) => {
            const costSteps = unit.costSteps && unit.costSteps.length > 0 
                ? unit.costSteps 
                : [{ models: unit.modelCount || 1, cost: parseInt(unit.cost || '0', 10) }];
            const currentStep = costSteps.find(step => step.models === unit.modelCount) || costSteps[0];
            return sum + currentStep.cost;
        }, 0);
        $("#totalPoints").text(totalPoints);

        // Delegated event listener for weapon checkboxes
        $selectedUnitsList.off("change", ".weapon-checkbox").on("change", ".weapon-checkbox", (e) => {
            const $checkbox = $(e.target);
            const weaponName = $checkbox.data("weapon-name");
            const unitIndex = parseInt($checkbox.data("index"), 10);
            const $statsDiv = $checkbox.closest(".weapon-label").next(".weapon-stats");

            if ($checkbox.is(":checked")) {
                $statsDiv.show(200);
            } else {
                $statsDiv.hide(200);
            }

            const unit = this.selectedUnits[unitIndex];
            if ($checkbox.is(":checked")) {
                const weaponToAdd = unit.weapons.find(w => w.name === weaponName);
                if (weaponToAdd && !unit.selectedWeapons.some(w => w.name === weaponName)) {
                    unit.selectedWeapons.push(weaponToAdd);
                }
            } else {
                unit.selectedWeapons = unit.selectedWeapons.filter(w => w.name !== weaponName);
            }

            this.saveToCookie();
        });
    }

    parseXML(xml) {
        let models = [];
        const seenNames = new Set();
        $(xml).find('selectionEntry[type="unit"], selectionEntry[type="model"]').each(function () {
            const $entry = $(this);
            const name = $entry.attr('name');

            // Exclusions based on name
            if (name === "Canoptek Acanthrite" || name === "Convergence of Dominion Starstele" || name === "Triarch Praetorian" || 
                name === "Ophydian Destroyer" || name === "Tomb Blade" || name === "Skorpekh Destroyer" || 
                name === "Canoptek Spyder" || name === "Canoptek Scarab Swarm" || name === "Immortal" || 
                name === "Cryptothrall" || name === "Deathmark" || name === "Flayed One" || name === "Lokhust Destroyer" || 
                name.includes("w/")) {
                console.log(`Unité exclue : ${name}`);
                return;
            }

            if (seenNames.has(name)) {
                console.log(`Doublon ignoré : ${name}`);
                return;
            }
            seenNames.add(name);

            const $constraints = $entry.find('constraints constraint');
            let minModels = parseInt($constraints.filter('[type="min"]').attr('value') || 1, 10);
            let maxModels = parseInt($constraints.filter('[type="max"]').attr('value') || minModels, 10);
            const baseCost = parseInt($entry.find('cost[name="pts"]').attr('value') || '0', 10);

            // Générer les paliers de coût
            const costSteps = [];
            const stepSize = minModels;
            for (let models = minModels; models <= maxModels; models += stepSize) {
                const cost = baseCost * (models / minModels);
                costSteps.push({ models, cost });
            }

            if (name === 'Chronomancer') {
                minModels = 1;
                maxModels = 1;
            }

            const weapons = WarhammerModels.extractWeapons($entry);

            // Extraire toutes les catégories
            const categories = [];
            $entry.find('categoryLink').each(function () {
                const categoryName = $(this).attr('name');
                categories.push(categoryName);
            });

            // Extraire toutes les infoLinks (règles comme Stealth, Infiltrators)
            const infoLinks = [];
            $entry.find('infoLink[type="rule"]').each(function () {
                const infoLinkName = $(this).attr('name');
                infoLinks.push(infoLinkName);
            });

            // Extract unit type from categoryLink
            let unitType = "Other Datasheets";
            $entry.find('categoryLink').each(function () {
                const categoryName = $(this).attr('name');
                if (categoryName === "Character") {
                    unitType = "Characters";
                    return false;
                } else if (categoryName === "Battleline") {
                    unitType = "Battleline";
                    return false;
                } else if (categoryName === "Dedicated Transport") {
                    unitType = "Dedicated Transports";
                    return false;
                }
            });

            const model = {
                name: name,
                id: $entry.attr('id'),
                characteristics: WarhammerModels.extractCharacteristics($entry),
                weapons: weapons,
                abilities: WarhammerModels.extractAbilities($entry),
                categories: categories,
                infoLinks: infoLinks, // Nouvelle propriété pour stocker les infoLinks
                imageUrl: WarhammerModels.getImageUrl(name),
                cost: baseCost,
                minModels: minModels,
                maxModels: maxModels,
                modelCount: minModels,
                costSteps: costSteps,
                unitType: unitType
            };

            console.log("Unité parsée :", model);
            models.push(model);
        });
        return models;
    }

    getUnitType(unit) {
        // Check for Legends first
        if (unit.name.includes("[Legends]")) {
            return "Legends";
        }

        // Use the type extracted from XML
        return unit.unitType || "Other Datasheets";
    }

    saveToCookie() {
        const armyData = JSON.stringify({
            units: this.selectedUnits,
            detachment: this.selectedDetachment,
            enhancements: this.selectedEnhancements
        });
        console.log("Saving to localStorage:", armyData);
        localStorage.setItem("currentArmy", armyData);
    }

    loadFromCookie() {
        try {
            const armyData = localStorage.getItem("currentArmy");
            if (armyData) {
                const parsedData = JSON.parse(armyData);
                console.log("Loading from localStorage:", parsedData);
                this.selectedUnits = parsedData.units || [];
                this.selectedDetachment = parsedData.detachment || null;
                this.selectedEnhancements = parsedData.enhancements || [];
                return this.selectedUnits;
            }
            console.warn("No data found in localStorage 'currentArmy'");
            return [];
        } catch (e) {
            console.error("Error loading data from localStorage 'currentArmy':", e);
            return [];
        }
    }

    populateUnitSelector() {
        const $unitList = $("#unitList").empty();

        // Define the order of types
        const typeOrder = [
            "Characters",
            "Battleline",
            "Dedicated Transports",
            "Other Datasheets",
            "Legends"
        ];

        // Group units by type
        const unitsByType = {};
        this.units.forEach(unit => {
            const type = this.getUnitType(unit);
            if (!unitsByType[type]) {
                unitsByType[type] = [];
            }
            unitsByType[type].push(unit);
        });

        // Sort and display units under each type
        typeOrder.forEach(type => {
            if (unitsByType[type] && unitsByType[type].length > 0) {
                // Add a heading for the type with a toggle button, initially collapsed
                const $typeHeader = $(`
                    <h3 class="type-header collapsed" data-type="${type}" aria-expanded="false" aria-controls="type-content-${type}">
                        ${type}
                        <span class="toggle-icon">▶</span>
                    </h3>
                `);
                $unitList.append($typeHeader);

                // Create a container for the units under this type
                const $typeContent = $(`<div class="type-section-content" id="type-content-${type}"></div>`);

                // Sort units within each type alphabetically by name
                unitsByType[type].sort((a, b) => a.name.localeCompare(b.name));

                // Add units under this type
                unitsByType[type].forEach(unit => {
                    const baseCost = parseInt(unit.cost || '0', 10);
                    const $unitItem = $(`
                        <div class="unit-item" data-unit-id="${unit.id}">
                            <div class="unit-item-header">
                                <img src="${unit.imageUrl}" alt="Unité ${unit.name}" width="100" height="100">
                                <div class="unit-info">
                                    <h3>${unit.name} - ${baseCost} pts</h3>
                                </div>
                                <div class="button-container">
                                    <button class="add-unit-btn" data-unit-id="${unit.id}" aria-label="Add ${unit.name} to army">+</button>
                                </div>
                            </div>
                        </div>
                    `);
                    $typeContent.append($unitItem);
                });

                $unitList.append($typeContent);

                // Add click handler to toggle visibility
                $typeHeader.on("click", () => {
                    const $content = $typeHeader.next(".type-section-content");
                    const isExpanded = $typeHeader.hasClass("expanded");

                    if (isExpanded) {
                        $content.slideUp(200);
                        $typeHeader.removeClass("expanded").addClass("collapsed").attr("aria-expanded", "false");
                        $typeHeader.find(".toggle-icon").text("▶");
                    } else {
                        $content.slideDown(200);
                        $typeHeader.removeClass("collapsed").addClass("expanded").attr("aria-expanded", "true");
                        $typeHeader.find(".toggle-icon").text("▼");
                    }
                });
            }
        });

        // Afficher les détails de l'unité au clic sur l'item (sauf sur le bouton +)
        $unitList.on("click", ".unit-item", (e) => {
            if (!$(e.target).hasClass("add-unit-btn")) {
                const unitId = $(e.currentTarget).data("unit-id");
                const selectedUnit = this.units.find(unit => unit.id === unitId);
                if (selectedUnit) {
                    this.displayUnitDetails(selectedUnit);
                }
            }
        });
    }

    static extractCharacteristics($entry) {
        let characteristics = {};
        $entry.find('profile[typeName="Unit"] characteristic').each(function () {
            characteristics[$(this).attr('name')] = $(this).text();
        });
        return characteristics;
    }

    static extractWeapons($entry) {
        let weapons = [];
        let weaponNames = new Set();
        const unitName = $entry.attr('name');
    
        // 1. Extraire les armes depuis les upgrades directs
        $entry.find('selectionEntry[type="upgrade"]').each(function () {
            const $weapon = $(this);
            const weaponName = $weapon.attr('name');
    
            if (weaponNames.has(weaponName)) return;
    
            let weaponData = {
                name: weaponName,
                id: $weapon.attr('id'),
                profiles: [],
                abilities: []
            };
    
            $weapon.find('profile[typeName="Melee Weapons"], profile[typeName="Ranged Weapons"]').each(function () {
                const $profile = $(this);
                let profileData = {
                    name: $profile.attr('name'),
                    type: $profile.attr('typeName'),
                    characteristics: {}
                };
                $profile.find('characteristic').each(function () {
                    profileData.characteristics[$(this).attr('name')] = $(this).text();
                });
                weaponData.profiles.push(profileData);
            });
    
            if (weaponData.profiles.length > 0) {
                weapons.push(weaponData);
                weaponNames.add(weaponName);
            }
        });
    
        // 2. Résoudre les entryLinks
        $entry.find('entryLink').each(function () {
            const $link = $(this);
            const targetId = $link.attr('targetId');
            const linkedWeaponName = $link.attr('name');
    
            if (weaponNames.has(linkedWeaponName)) return;
    
            const $targetWeapon = $(`selectionEntry[id="${targetId}"]`);
            if ($targetWeapon.length > 0) {
                let weaponData = {
                    name: linkedWeaponName,
                    id: targetId,
                    profiles: [],
                    abilities: []
                };
    
                $targetWeapon.find('profile[typeName="Melee Weapons"], profile[typeName="Ranged Weapons"]').each(function () {
                    const $profile = $(this);
                    let profileData = {
                        name: $profile.attr('name'),
                        type: $profile.attr('typeName'),
                        characteristics: {}
                    };
                    $profile.find('characteristic').each(function () {
                        profileData.characteristics[$(this).attr('name')] = $(this).text();
                    });
                    weaponData.profiles.push(profileData);
                });
    
                if (weaponData.profiles.length > 0) {
                    weapons.push(weaponData);
                    weaponNames.add(linkedWeaponName);
                }
            }
        });
    
        // 3. Ajouter les armes "en dur" pour certaines unités spécifiques
        if (unitName === "Necron Warriors") {
            if (!weaponNames.has("Close combat weapon")) {
                weapons.push({
                    name: "Close combat weapon",
                    id: "69d2-ffd6-3daf-b437",
                    profiles: [{
                        name: "Close combat weapon",
                        type: "Melee Weapons",
                        characteristics: {
                            "Range": "Melee",
                            "A": "1",
                            "WS": "4+",
                            "S": "4",
                            "AP": "0",
                            "D": "1",
                            "Keywords": "-"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Close combat weapon");
            }
    
            if (!weaponNames.has("Gauss flayer")) {
                weapons.push({
                    name: "Gauss flayer",
                    id: "abb0-d7fe-2195-4655",
                    profiles: [{
                        name: "Gauss flayer",
                        type: "Ranged Weapons",
                        characteristics: {
                            "Range": "24\"",
                            "A": "1",
                            "BS": "4+",
                            "S": "4",
                            "AP": "0",
                            "D": "1",
                            "Keywords": "Lethal Hits, Rapid Fire 1"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Gauss flayer");
            }
        }
    
        if (unitName === "Canoptek Wraiths") {
            // Ajouter "Vicious claws"
            if (!weaponNames.has("Vicious claws")) {
                weapons.push({
                    name: "Vicious claws",
                    id: "f702-9067-d0c3-4240",
                    profiles: [{
                        name: "Vicious claws",
                        type: "Melee Weapons",
                        characteristics: {
                            "Range": "Melee",
                            "A": "4",
                            "WS": "4+",
                            "S": "6",
                            "AP": "-1",
                            "D": "2",
                            "Keywords": "-"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Vicious claws");
            }
    
            // Ajouter "Particle caster"
            if (!weaponNames.has("Particle caster")) {
                weapons.push({
                    name: "Particle caster",
                    id: "47d9-c7ea-bdff-7acc",
                    profiles: [{
                        name: "Particle caster",
                        type: "Ranged Weapons",
                        characteristics: {
                            "Range": "12\"",
                            "A": "3",
                            "BS": "4+",
                            "S": "5",
                            "AP": "0",
                            "D": "1",
                            "Keywords": "Devastating Wounds, Pistol"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Particle caster");
            }
    
            // Ajouter "Transdimensional beamer"
            if (!weaponNames.has("Transdimensional beamer")) {
                weapons.push({
                    name: "Transdimensional beamer",
                    id: "9da4-7ea8-8392-bc3",
                    profiles: [{
                        name: "Transdimensional beamer",
                        type: "Ranged Weapons",
                        characteristics: {
                            "Range": "12\"",
                            "A": "1",
                            "BS": "4+",
                            "S": "4",
                            "AP": "-2",
                            "D": "3",
                            "Keywords": "-"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Transdimensional beamer");
            }
    
            // Ajouter "Whip coils"
            if (!weaponNames.has("Whip coils")) {
                weapons.push({
                    name: "Whip coils",
                    id: "28a0-eb82-f9dc-5ac1",
                    profiles: [{
                        name: "Whip coils",
                        type: "Melee Weapons",
                        characteristics: {
                            "Range": "Melee",
                            "A": "8",
                            "WS": "4+",
                            "S": "5",
                            "AP": "0",
                            "D": "1",
                            "Keywords": "-"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Whip coils");
            }
        }

        if (unitName === "Lokhust Heavy Destroyers") {
            // Ajouter "Close combat weapon"
            if (!weaponNames.has("Close combat weapon")) {
                weapons.push({
                    name: "Close combat weapon",
                    id: "77d-65cf-d088-2296",
                    profiles: [{
                        name: "Close combat weapon",
                        type: "Melee Weapons",
                        characteristics: {
                            "Range": "Melee",
                            "A": "2",
                            "WS": "3+",
                            "S": "4",
                            "AP": "0",
                            "D": "1",
                            "Keywords": "-"
                        }
                    }],
                    abilities: []
                });
                weaponNames.add("Close combat weapon");
            }
        }
    
        return weapons;
    }  

    static extractAbilities($entry) {
        let abilities = [];
        $entry.find('profile[typeName="Abilities"]').each(function () {
            const $profile = $(this);
            abilities.push({
                name: $profile.attr('name'),
                description: $profile.find('characteristic').first().text() || 'Pas de description'
            });
        });
        return abilities;
    }

    

    static getImageUrl(unitName) {
        const associationTableau = [
            ["Lokhust Heavy Destroyers", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"],
            ["The Silent King", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110047_NECSzarekhSilentKingLead.jpg?fm=webp&w=920&h=948"],
            ["Lokhust Destroyers", "https://www.rart.fr/39420-large_default/destroyer-lokhust.jpg"],
            ["Canoptek Doomstalker", "https://wh40k.lexicanum.com/mediawiki/images/thumb/f/f2/Canoptek_Doomstalker.jpg/600px-Canoptek_Doomstalker.jpg"],
            ["Skorpekh Lord", "https://wh40k.lexicanum.com/mediawiki/images/thumb/6/6c/Skorpekh_Lord_9th.jpg/120px-Skorpekh_Lord_9th.jpg"],
            ["Necron Warriors", "https://wh40k.lexicanum.com/mediawiki/images/thumb/1/14/NecronWarriors2020.jpg/116px-NecronWarriors2020.jpg"],
            ["Orikan the Diviner", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110081_OrikanDiviner1.jpg?fm=webp&w=670&h=691"],
            ["Imotekh the Stormlord", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110078_NECImotekhTheStormlord01.jpg"],
            ["Anrakyr the Traveller [Legends]", "https://www.rart.fr/39422-large_default/anrakyr-the-traveller-1676987054.webp"],
            ["Varguard Obyron [Legends]", "https://www.rart.fr/39457-large_default/vargard-obyron-1676987066.webp"],
            ["Illuminor Szeras", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110049_IlluminorSzerasLead.jpg?fm=webp&w=670&h=691"],
            ["Nemesor Zahndrekh [Legends]", "https://www.adeptusars.com/wp-content/uploads/2023/08/Nemesor-Zahndrekh.jpg"],
            ["Trazyn the Infinite", "https://www.warhammer.com/app/resources/catalog/product/920x950/99800110009_TrazynTheInfiniteNEW01.jpg"],
            ["Royal Warden", "https://www.warhammer.com/app/resources/catalog/product/920x950/99070110007_RoyalWarden1.jpg"],
            ["Lokhust Lord", "https://wh40k.lexicanum.com/mediawiki/images/thumb/c/c9/DestroyerLord5th.jpg/373px-DestroyerLord5th.jpg"],
            ["Lord [Legends]", "https://www.adeptusars.com/wp-content/uploads/2024/01/Necron-Lord-with-Resurrection-Orb-Model.jpg"],
            ["Catacomb Command Barge", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110064_CatacombCommandBargeLead.jpg"],
            ["Overlord", "https://manatorsk.com/cdn/shop/files/99070110006_OverlordTachyonArrow1.jpg?v=1703681737"],
            ["Technomancer", "https://i.ebayimg.com/images/g/-5cAAOSwYrlkmmmf/s-l1200.jpg"],
            ["Psychomancer", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110073_NECPsychomancerLead.jpg"],
            ["Chronomancer", "https://www.warhammer.com/app/resources/catalog/product/920x950/99070110003_NECChronomancerLead.jpg"],
            ["Plasmancer", "https://i.ebayimg.com/images/g/wHcAAOSw4E5fCbtz/s-l1200.png"],
            ["Warrior w/ gauss flayer", "https://wh40k.lexicanum.com/mediawiki/images/thumb/1/14/NecronWarriors2020.jpg/116px-NecronWarriors2020.jpg"],
            ["Warrior w/ gauss reaper", "https://wh40k.lexicanum.com/mediawiki/images/thumb/1/14/NecronWarriors2020.jpg/116px-NecronWarriors2020.jpg"],
            ["Immortals", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110057_NECImmortalsLead.jpg?fm=webp&w=670&h=691"],
            ["Canoptek Reanimator", "https://www.picclickimg.com/omEAAOSwvEdfKXQb/Canoptek-Reanimator-Indomitus-Warhammer-40k.webp"],
            ["Hexmark Destroyer", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110048_HexmarkDestroyerLead.jpg?fm=webp&w=670&h=691"],
            ["Lychguard", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110012_LychguardNEW03.jpg"],
            ["Deathmarks", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110057_NECImmortalsGroup2.jpg?fm=webp&w=670&h=691"],
            ["Flayed Ones", "https://www.ludifolie.com/48158-thickbox_default/warhammer-40k-necrons-flayed-ones.jpg"],
            ["Cryptothralls", "https://i.ebayimg.com/images/g/c7gAAOSwZeNlJZCf/s-l400.jpg"],
            ["Skorpekh Destroyers", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110051_SkorpekhDestroyersLead.jpg?fm=webp&w=670&h=691"],
            ["Triarch Stalker", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110058_NecronTriarchStalkerLead.jpg?fm=webp&w=670&h=691"],
            ["C'tan Shard of the Deceiver", "https://www.warhammer.com/app/resources/catalog/product/920x950/99810110003_TheDeceiverNEW01.jpg"],
            ["C'tan Shard of the Nightbringer", "https://www.warhammer.com/app/resources/catalog/product/920x950/99810110004_TheNightbringerNEW02.jpg?fm=webp&w=670&h=691"],
            ["C'tan Shard of the Void Dragon", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110054_CTanShardoftheVoidDragonLead.jpg?fm=webp&w=670&h=691"],
            ["Transcendant C'tan", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110026_NecronTesseract04.jpg?fm=webp&w=670&h=691"],
            ["Canoptek Spyders", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110061_CanoptekSpyderLead.jpg?fm=webp&w=600&h=619"],
            ["Canoptek Scarab Swarms", "https://cdn.shoplightspeed.com/shops/628959/files/45493905/games-workshop-necrons-3-canoptek-scarab-swarms-2.jpg"],
            ["Ophydian Destroyers", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110053_NECOphydianDestroyersLead.jpg"],
            ["Tomb Blades", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110059_NECTombBladesLead.jpg"],
            ["Triarch Praetorians", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110058_NecronsTriarchPraetoriansLead.jpg?fm=webp&w=670&h=691"],
            ["Canoptek Wraiths", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110060_NECCanoptekWraithsLead.jpg"],
            ["Wraith w/ claws and beamer", "https://via.placeholder.com/150"],
            ["Wraith w/ claws and particle caster", "https://via.placeholder.com/150"],
            ["Wraith w/ claws", "https://via.placeholder.com/150"],
            ["Wraith w/ coils", "https://via.placeholder.com/150"],
            ["Wraith w/ coils and beamer", "https://via.placeholder.com/150"],
            ["Wraith w/ coils and particle caster", "https://via.placeholder.com/150"],
            ["Annihilation Barge", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110064_CatacombAnnihilationBargeLead.jpg?fm=webp&w=670&h=691"],
            ["Doomsday Ark", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110063_NECDoomsdayArkLead.jpg"],
            ["Lokhust Destroyer", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=600&h=619"],
            ["Destroyer w/ enmitic exterminator", "https://via.placeholder.com/150"],
            ["Destroyer w/ gauss destructor", "https://via.placeholder.com/150"],
            ["Ghost Ark", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110063_NECGhostArkLead.jpg"],
            ["Night Scythe", "https://www.hobby-max.fr/48589-large_default/necrons-doom-night-scythe.jpg"],
            ["Doom Scythe", "https://www.hobby-max.fr/48589-large_default/necrons-doom-night-scythe.jpg"],
            ["Obelisk", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110026_NecronObelisk01.jpg?fm=webp&w=670&h=691"],
            ["Tesseract Vault", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110026_NecronTesseract01.jpg?fm=webp&w=670&h=691"],
            ["Monolith", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110043_NECMonolithLead.jpg"],
            ["Szarekh", "https://www.warhammer.com/app/resources/catalog/product/920x950/99120110047_NECSzarekhSilentKingLead.jpg?fm=webp&w=670&h=691"],
            ["Triarchal Menhir", "https://wh40k.lexicanum.com/mediawiki/images/thumb/2/2a/MenhirArt.jpg/140px-MenhirArt.jpg"],
            ["Convergence of Dominion", "https://www.adeptusars.com/wp-content/uploads/2023/08/Convergence-of-Dominion.jpg"],
            ["Canoptek Tomb Stalker [Legends]", "https://taleofpainters.com/wp-content/uploads/2013/08/NecronTombStalker.jpg"],
            ["Canoptek Tomb Sentinel [Legends]", "https://i.redd.it/do-you-think-tomb-sentinel-tomb-stalker-and-other-forge-v0-2vnb3fjiu03b1.jpg?width=920&format=pjpg&auto=webp&s=e04b9f6190965d3b3523eea6dbf2f98201756942"],
            ["Canoptek Acanthrites [Legends]", "https://skaystore.ru/images/detailed/124/7EJ1XmHkSfs_swxj-tr.jpg"],
            ["Tesseract Ark [Legends]", "https://miniset.net/files/set/gw-99860110011-0.jpg"],
            ["Seraptek Heavy Construct", "https://www.warhammer.com/app/resources/catalog/product/threeSixty/99860110022_NecronCeraptekConstructwithSynaptecs360/01.jpg"],
            ["Gauss Pylon [Legends]", "https://darkminiatures.com/image/cache/catalog/tovary/g-w/wr./fw-263-500x500.png"],
            ["Sentry Pylon [Legends]", "https://skaystore.ru/images/detailed/72/sentrypylonge1.jpg"],
            ["Night Shroud [Legends]", "https://ssl.images-ssl-mars.com/65463/2020/12/11/3/5/3544b9a0cd58b462.jpg"],
            ["Overlord with Translocation Shroud", "https://www.ludifolie.com/48162-thickbox_default/warhammer-40k-necrons-overlord-with-translocation-shroud.jpg"]
        ];
        const entry = associationTableau.find(([name]) => name === unitName);
        return entry ? entry[1] : 'https://via.placeholder.com/150';
    }

        
    initLoginControls() {
        $("#loginBtn").on("click", () => this.login());
        $("#registerBtn").on("click", () => this.register());
        $("#logoutBtn").on("click", () => this.logout());
        $("#searchArmiesBtn").on("click", () => this.searchArmiesByUser());
        this.checkLoginStatus(); 
    }

    // Vérifier si un utilisateur est déjà connecté (via localStorage par exemple)
    checkLoginStatus() {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.showMainInterface();
        } else {
            this.showLoginInterface();
        }
    }

    // Afficher l'interface de connexion
    showLoginInterface() {
        $("#loginSection").show();
        $("#loginForm").show();
        $("#userInfo").hide();
        $("#mainInterface").show(); 
        $("#armyHeader").hide();
    }

    // Afficher l'interface principale
    showMainInterface() {
        $("#loginForm").hide();
        $("#userInfo").show();
        $("#mainInterface").show();
        $("#armyHeader").show(); // Afficher les contrôles après connexion
        this.populateUnitSelector();
        this.initArmyControls();
        $("#currentUserDisplay").text(`Connecté en tant que : ${this.currentUser.username}`);
    }

    // Connexion
    login() {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (!username || !password) {
            alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
            return;
        }

        $.ajax({
            url: "https://soundtable.fr/api/armies.php", // À adapter si vous avez un endpoint dédié pour login
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password, action: "login" }), // Ajouter un champ action si nécessaire
            success: (response) => {
                this.currentUser = { username, password }; 
                localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                this.showMainInterface();
            },
            error: (err) => {
                console.error("Erreur lors de la connexion :", err);
                alert("Erreur lors de la connexion. Vérifiez vos identifiants.");
            }
        });
    }

    // Inscription
    register() {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (!username || !password) {
            alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
            return;
        }

        $.ajax({
            url: "https://soundtable.fr/api/armies.php", // À adapter si endpoint séparé
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password, action: "register" }),
            success: (response) => {
                alert("Compte créé avec succès ! Connectez-vous maintenant.");
            },
            error: (err) => {
                console.error("Erreur lors de l'inscription :", err);
                alert("Erreur lors de la création du compte.");
            }
        });
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem("currentUser");
        this.showLoginInterface();
        this.selectedUnits = []; // Réinitialiser la liste
        this.displaySelectedUnits();
        this.saveToCookie();
    }

    // Initialisation des contrôles d'armée
    initArmyControls() {
        $("#saveArmyBtn").on("click", () => this.saveArmy());
        $("#loadArmyBtn").on("click", () => this.loadArmyList());
        $("#updateArmyBtn").on("click", () => this.updateArmy()); // Nouveau bouton pour mise à jour
        $("#savedArmies").on("change", (event) => {
            const armyId = event.target.value;
            this.currentArmy = armyId
            if (armyId) this.loadSelectedArmy(armyId);
        });
        this.loadArmyList();
    }

    // Sauvegarder une armée
    saveArmy() {
        if (!this.currentUser) {
            alert("You must be logged in to save an army.");
            return;
        }

        const armyName = $("#armyName").val().trim();
        const password = this.currentUser.password;

        if (!armyName || !password) {
            alert("Please enter an army name and your password.");
            return;
        }

        if (this.selectedUnits.length === 0 && !this.selectedDetachment && this.selectedEnhancements.length === 0) {
            alert("No units, detachment, or enhancements selected to save.");
            return;
        }

        // Validate units
        const validatedUnits = this.selectedUnits.map(unit => {
            if (!unit.id || !unit.name || !unit.modelCount || !unit.costSteps) {
                console.error("Invalid unit:", unit);
                throw new Error(`Invalid unit: ${unit.name || 'unknown'}`);
            }
            return {
                id: unit.id, // Server expects 'id' for unit_id
                name: unit.name, // Server expects 'name' for unit_name
                characteristics: unit.characteristics || {},
                selectedWeapons: unit.selectedWeapons || [], // Server expects 'selectedWeapons'
                selectedAbilities: unit.selectedAbilities || [], // Server expects 'selectedAbilities'
                imageUrl: unit.imageUrl || '', // Server expects 'imageUrl'
                modelCount: unit.modelCount || 1, // Server expects 'modelCount'
                minModels: unit.minModels || 1, // Server expects 'minModels'
                maxModels: unit.maxModels || unit.minModels || 1, // Server expects 'maxModels'
                costSteps: unit.costSteps || [{ models: unit.modelCount, cost: unit.cost || 0 }] // Server expects 'costSteps'
            };
        });

        const armyData = {
            username: this.currentUser.username,
            password,
            armyName: armyName, // Use 'armyName' to match server expectation
            units: validatedUnits
            // Note: Detachment and enhancements are excluded as the server doesn't support them
        };

        console.log("Sending data to API:", armyData);

        $.ajax({
            url: "https://soundtable.fr/api/armies.php",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(armyData),
            success: (response) => {
                console.log("API response:", response);
                if (response.id && response.message) {
                    alert("Army saved successfully!");
                    this.loadArmyList();
                } else {
                    alert(`Error saving army: ${response.error || 'Unknown error'}`);
                }
            },
            error: (xhr) => {
                console.error("Error during save:", {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    responseText: xhr.responseText,
                    responseJSON: xhr.responseJSON
                });
                let errorMessage = "Error saving the army.";
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage += ` Details: ${xhr.responseJSON.error}`;
                }
                alert(errorMessage);
            }
        });
    }

    // Charger la liste des armées
    loadArmy(armyId) {
        $.ajax({
            url: `https://soundtable.fr/api/armies.php?id=${armyId}`,
            method: "GET",
            success: (response) => {
                console.log("Réponse API pour armée :", response);
                if (!response.units) {
                    alert("Aucune unité trouvée pour cette armée.");
                    return;
                }

                this.selectedUnits = response.units.map(serverUnit => {
                    // Find matching unit in models by unit_id
                    const fullUnit = this.models.find(model => model.id === serverUnit.unit_id);
                    if (!fullUnit) {
                        console.warn(`Unité non trouvée dans models pour ID ${serverUnit.unit_id}, utilisant données serveur`);
                        return {
                            id: serverUnit.unit_id,
                            name: serverUnit.unit_name,
                            characteristics: JSON.parse(serverUnit.characteristics || '{}'),
                            selectedWeapons: JSON.parse(serverUnit.selected_weapons || '[]'),
                            selectedAbilities: JSON.parse(serverUnit.selected_abilities || '[]'),
                            imageUrl: serverUnit.image_url || '',
                            modelCount: serverUnit.model_count || 1,
                            minModels: serverUnit.min_models || 1,
                            maxModels: serverUnit.max_models || 1,
                            costSteps: JSON.parse(serverUnit.cost_steps || '[]'),
                            categories: [], // Fallback empty arrays
                            infoLinks: [],
                            abilities: [],
                            weapons: []
                        };
                    }

                    // Merge server data with full unit data
                    return {
                        ...fullUnit, // Copy all properties from fullUnit (categories, infoLinks, etc.)
                        modelCount: serverUnit.model_count || fullUnit.minModels,
                        selectedWeapons: JSON.parse(serverUnit.selected_weapons || '[]'),
                        selectedAbilities: JSON.parse(serverUnit.selected_abilities || '[]'),
                        imageUrl: serverUnit.image_url || fullUnit.imageUrl,
                        costSteps: JSON.parse(serverUnit.cost_steps || '[]') || fullUnit.costSteps
                    };
                });

                // Update UI
                this.displaySelectedUnits();
                console.log("Unités rafraîchies :", this.selectedUnits);
            },
            error: (xhr) => {
                console.error("Erreur lors du chargement de l'armée :", xhr);
                alert(`Erreur lors du chargement de l'armée : ${xhr.responseJSON?.error || xhr.statusText}`);
            }
        });
    }



    // Rechercher les armées d’un utilisateur spécifique
    searchArmiesByUser() {
        const searchUsername = $("#searchUsername").val().trim();
        if (!searchUsername) {
            alert("Veuillez entrer un nom d'utilisateur à rechercher.");
            return;
        }

        $.ajax({
            url: `https://soundtable.fr/api/armies.php?username=${searchUsername}`,
            method: "GET",
            success: (armies) => {
                const $savedArmies = $("#savedArmies").empty();
                $savedArmies.append('<option value="">Choisissez une armée sauvegardée</option>');
                if (Array.isArray(armies) && armies.length > 0) {
                    armies.forEach(army => {
                        $savedArmies.append(`<option value="${army.id}">${army.army_name} (${army.username})</option>`);
                        if (this.currentUser && this.currentUser.username === army.username) {
                            $savedArmies.find(`option[value="${army.id}"]`).after(
                                `<button class="deleteArmyBtn" data-army-id="${army.id}">Supprimer</button>`
                            );
                        }
                    });
                    $(".deleteArmyBtn").on("click", (e) => {
                        const armyId = $(e.target).data("army-id");
                        this.deleteArmy(armyId);
                    });
                } else {
                    $savedArmies.append('<option value="">Aucune armée trouvée pour cet utilisateur</option>');
                }
            },
            error: (err) => {
                console.error("Erreur lors de la recherche :", err);
                alert("Erreur lors de la recherche des armées.");
            }
        });
    }

    // Charger une armée spécifique
    loadSelectedArmy(armyId) {
        const password = this.currentUser.password;

        if (!password) {
            alert("Please enter your password to load an army.");
            return;
        }

        $.ajax({
            url: `https://soundtable.fr/api/armies.php?id=${armyId}&username=${this.currentUser.username}&password=${password}`,
            method: "GET",
            success: (army) => {
                if (!army || !Array.isArray(army.units)) {
                    alert("Error: No units found for this army.");
                    return;
                }

                this.selectedUnits = army.units.map(unit => {
                    const originalUnit = this.units.find(u => u.id === unit.unit_id) || {};
                    const modelCount = unit.model_count !== undefined ? unit.model_count : (originalUnit.minModels || 1);
                    const costSteps = unit.cost_steps && unit.cost_steps.length > 0 
                        ? unit.cost_steps 
                        : (originalUnit.costSteps || [{ models: modelCount, cost: parseInt(originalUnit.cost || '0', 10) }]);

                    return {
                        name: unit.unit_name,
                        id: unit.unit_id,
                        characteristics: unit.characteristics,
                        selectedWeapons: unit.selected_weapons,
                        selectedAbilities: unit.selected_abilities,
                        imageUrl: unit.image_url,
                        modelCount: modelCount,
                        minModels: unit.min_models !== undefined ? unit.min_models : (originalUnit.minModels || 1),
                        maxModels: unit.max_models !== undefined ? unit.max_models : (originalUnit.maxModels || 1),
                        costSteps: costSteps,
                        cost: costSteps.find(step => step.models === modelCount)?.cost || originalUnit.cost || '0'
                    };
                });

                this.selectedDetachment = army.detachment ? {
                    id: army.detachment.id,
                    name: army.detachment.name,
                    rules: army.detachment.rules
                } : null;

                this.selectedEnhancements = army.enhancements ? army.enhancements.map(enh => ({
                    id: enh.id,
                    name: enh.name,
                    cost: enh.cost,
                    description: enh.description,
                    restrictions: enh.restrictions
                })) : [];

                console.log("Loaded army:", { units: this.selectedUnits, detachment: this.selectedDetachment, enhancements: this.selectedEnhancements });
                this.displaySelectedUnits();
                this.saveToCookie();
            },
            error: (err) => {
                console.error("Error loading army:", err);
                alert("Error loading army.");
            }
        });
    }

    // Supprimer une armée
    deleteArmy(armyId) {
        if (!this.currentUser) {
            alert("Vous devez être connecté pour supprimer une armée.");
            return;
        }

        const password = this.currentUser.password;
        if (!password) {
            alert("Veuillez entrer votre mot de passe pour supprimer une armée.");
            return;
        }

        if (!confirm("Voulez-vous vraiment supprimer cette armée ?")) return;

        $.ajax({
            url: "https://soundtable.fr/api/armies.php",
            method: "DELETE",
            contentType: "application/json",
            data: JSON.stringify({
                username: this.currentUser.username,
                password,
                armyId
            }),
            success: (response) => {
                alert("Armée supprimée avec succès !");
                this.loadArmyList();
            },
            error: (err) => {
                console.error("Erreur lors de la suppression :", err);
                alert("Erreur lors de la suppression de l'armée.");
            }
        });
    }

    // Mettre à jour une armée (propriétaire uniquement)
    updateArmy() {
        if (!this.currentUser) {
            alert("Vous devez être connecté pour mettre à jour une armée.");
            return;
        }

        const armyId = $("#savedArmies").val();
        const password = this.currentUser.password;
        if (!armyId || !password) {
            alert("Veuillez sélectionner une armée et entrer votre mot de passe.");
            return;
        }

        $.ajax({
            url: `https://soundtable.fr/api/armies.php?id=${armyId}&username=${this.currentUser.username}&password=${password}`,
            method: "GET",
            success: (army) => {
                if (army.username !== this.currentUser.username) {
                    alert("Vous ne pouvez mettre à jour que vos propres armées.");
                    return;
                }

                const armyData = {
                    username: this.currentUser.username,
                    password,
                    armyName: army.army_name,
                    units: this.selectedUnits.map(unit => ({
                        name: unit.name,
                        id: unit.id,
                        characteristics: unit.characteristics,
                        selectedWeapons: unit.selectedWeapons,  // Correspond à selected_weapons
                        selectedAbilities: unit.selectedAbilities,  // Correspond à selected_abilities
                        imageUrl: unit.imageUrl,
                        modelCount: unit.modelCount,
                        minModels: unit.minModels,
                        maxModels: unit.maxModels,
                        costSteps: unit.costSteps
                    }))
                };

                // Suppression puis recréation pour mise à jour
                $.ajax({
                    url: "https://soundtable.fr/api/armies.php",
                    method: "DELETE",
                    contentType: "application/json",
                    data: JSON.stringify({
                        username: this.currentUser.username,
                        password,
                        armyId
                    }),
                    success: () => {
                        $.ajax({
                            url: "https://soundtable.fr/api/armies.php",
                            method: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(armyData),
                            success: (response) => {
                                alert("Armée mise à jour avec succès !");
                                this.loadArmyList();
                            },
                            error: (err) => {
                                console.error("Erreur lors de la mise à jour :", err);
                                alert("Erreur lors de la mise à jour de l'armée.");
                            }
                        });
                    },
                    error: (err) => {
                        console.error("Erreur lors de la suppression pour mise à jour :", err);
                        alert("Erreur lors de la mise à jour de l'armée.");
                    }
                });
            },
            error: (err) => {
                console.error("Erreur lors de la vérification de l'armée :", err);
                alert("Erreur lors de la vérification de l'armée.");
            }
        });
    }

}


function initWarhammerModels() {
    $.ajax({
        url: "/page/warhammeur/data.xml",
        dataType: "xml",
        success: function (xml) {
            const warhammer = new WarhammerModels(xml);
            warhammer.initLoginControls()
        },
        error: function () {
            console.error("Erreur de chargement du fichier XML");
        }
    });
}


// Fonction pour suivre une page
function trackPageView(pageName) {
    $.ajax({
        url: 'https://soundtable.fr/api/armies.php', // Remplacez par l'URL de votre API
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            action: 'track-page-view',
            pageName: pageName
        }),
        success: function(response) {
            console.log('Réponse du serveur :', response);
        },
        error: function(xhr, status, error) {
            console.error('Erreur AJAX :', status, error);
        }
    });
}
// Récupérer le chemin de l'URL actuelle
var currentPage = window.location.pathname || 'unknown';
// Nettoyer le chemin (supprimer le "/" initial et l'extension .html ou .php si présente)
currentPage = currentPage.replace(/^\/|(\.html|\.php)$/g, '') || 'index'; // Si vide, utiliser "index"




$(document).ready(function () {
    initWarhammerModels();
    trackPageView(currentPage);
});