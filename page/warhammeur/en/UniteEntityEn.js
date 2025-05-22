class WarhammerModels {
    constructor(xmlData) {
        this.units = this.parseXML(xmlData);
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
    }

    addToSelectedUnits(unit, selectedWeapons, selectedAbilities) {
        const defaultCostSteps = unit.costSteps && unit.costSteps.length > 0 
            ? unit.costSteps 
            : [{ models: unit.minModels || 1, cost: parseInt(unit.cost || '0', 10) }];

        const newUnit = {
            ...unit,
            selectedWeapons: selectedWeapons || [],
            selectedAbilities: selectedAbilities || [],
            modelCount: unit.minModels || 1,
            costSteps: defaultCostSteps
        };
        this.selectedUnits.push(newUnit);
        console.log("Units after addition:", this.selectedUnits); // Check here
        this.displaySelectedUnits();
        this.saveToCookie();
    }

    changeModelCount(index, direction) {
        const unit = this.selectedUnits[index];
        
        // Find the current step index
        const currentStepIndex = unit.costSteps.findIndex(step => step.models === unit.modelCount);
        const newStepIndex = currentStepIndex + direction;

        // Check if the new step is valid
        if (newStepIndex >= 0 && newStepIndex < unit.costSteps.length) {
            unit.modelCount = unit.costSteps[newStepIndex].models;
            this.displaySelectedUnits();
            this.saveToCookie();
        } else {
            const stepsText = unit.costSteps.map(step => `${step.models} models (${step.cost} pts)`).join(', ');
            alert(`The number of models must be one of: ${stepsText}`);
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
                <div class="selected-unit" data-index="${index}">
                    <div class="selected-unit-header">
                        <img class="unit-illustration" width="100px" height="100px" src="${unit.imageUrl}" alt="Necron Unit ${unit.name} for Warhammer">
                        <div class="skibidibapbap">
                            <button class="remove-unit-btn" data-index="${index}">Remove</button>
                            <h3>${unit.name} - ${totalCost} pts${hasModelVariation ? ` (${unit.modelCount} models)` : ''}</h3>
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

            $unitDiv.on("click", (e) => {
                if (!$(e.target).is("button")) {
                    this.toggleUnitDetails(index);
                }
            });

            $unitDiv.find(".remove-unit-btn").on("click", (e) => {
                e.stopPropagation();
                this.removeUnit(index);
            });

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
        });

        const totalPoints = this.selectedUnits.reduce((sum, unit) => {
            const costSteps = unit.costSteps && unit.costSteps.length > 0 
                ? unit.costSteps 
                : [{ models: unit.modelCount || 1, cost: parseInt(unit.cost || '0', 10) }];
            const currentStep = costSteps.find(step => step.models === unit.modelCount) || costSteps[0];
            return sum + currentStep.cost;
        }, 0);

        $("#totalPoints").text(totalPoints);

        // Initialize SortableJS to allow unit reordering
        new Sortable($selectedUnitsList[0], {
            animation: 150, // Smooth animation during movement
            handle: ".selected-unit", // Allow dragging by clicking anywhere on the div (except buttons)
            filter: "button", // Ignore clicks on buttons to avoid interference
            onEnd: (evt) => {
                // Update this.selectedUnits after reordering
                const oldIndex = evt.oldIndex;
                const newIndex = evt.newIndex;
                const movedUnit = this.selectedUnits.splice(oldIndex, 1)[0];
                this.selectedUnits.splice(newIndex, 0, movedUnit);
                console.log("New unit order:", this.selectedUnits); // For debugging
                this.saveToCookie(); // Save the new order to the cookie
            }
        });
    }

    // New method to remove a unit
    removeUnit(index) {
        this.selectedUnits.splice(index, 1); // Remove the unit at the specified index
        this.displaySelectedUnits(); // Refresh the display
        this.saveToCookie();
    }

    initEventListeners() {
        $("#unitDetails").on("click", "#addToListBtn", () => {
            const selectedUnit = this.units.find(unit => unit.id === $("#unitSelector").val());
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

        if ($unitDiv.hasClass("expanded")) {
            $unitDiv.removeClass("expanded");
            $unitDiv.find(".unit-details").remove();
        } else {
            $unitDiv.addClass("expanded");
            const characteristics = Object.entries(unit.characteristics);
            const $details = $(`
                <div class="unit-details">
                    <h4>Characteristics</h4>
                    <table class="stats-table">
                        <tr>
                            ${characteristics.map(([key]) => `<th>${key}</th>`).join('')}
                        </tr>
                        <tr>
                            ${characteristics.map(([, value]) => `<td>${value}</td>`).join('')}
                        </tr>
                    </table>
                    ${unit.selectedWeapons.length > 0 ? `
                        <h4>Selected Weapons</h4>
                        ${unit.selectedWeapons.map(weapon => `
                            <p><strong>${weapon.name}</strong></p>
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
                        `).join('')}
                    ` : ''}
                    ${unit.selectedAbilities.length > 0 ? `
                        <h4>Selected Abilities</h4>
                        <ul>${unit.selectedAbilities.map(ability => `<li><strong>${ability.name}:</strong> ${ability.description}</li>`).join('')}</ul>
                    ` : ''}
                </div>
            `);
            $unitDiv.append($details);
        }
    }

    displayUnitDetails(unit) {
        const $unitDetails = $("#unitDetails").empty();

        $unitDetails.append(`<h2>${unit.name} - ${unit.cost} pts</h2>`);
        if (unit.imageUrl) {
            $unitDetails.append(`<img src="${unit.imageUrl}" alt="${unit.name}">`);
        }

        const characteristics = Object.entries(unit.characteristics);
        let characHtml = `
            <h3>Characteristics</h3>
            <table class="stats-table">
                <tr>
                    ${characteristics.map(([key]) => `<th>${key}</th>`).join('')}
                </tr>
                <tr>
                    ${characteristics.map(([, value]) => `<td>${value}</td>`).join('')}
                </tr>
            </table>
        `;
        $unitDetails.append(characHtml);

        if (unit.weapons.length > 0) {
            let weaponsHtml = "<h3>Weapons</h3><form id='weaponSelection'>";
            unit.weapons.forEach(weapon => {
                weaponsHtml += `
                    <label>
                        <input type="checkbox" class="weapon-checkbox" value="${weapon.name}">
                        <strong>${weapon.name}</strong>
                    </label><br>`;

                if (weapon.profiles.length > 0) {
                    weaponsHtml += `
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
                            </tr>`;
                    weapon.profiles.forEach(profile => {
                        let charac = profile.characteristics;
                        weaponsHtml += `
                            <tr>
                                <td>${profile.type}</td>
                                <td>${charac["Range"] || "-"}</td>
                                <td>${charac["A"] || "-"}</td>
                                <td>${charac[profile.type === "Melee Weapons" ? "WS" : "BS"] || "-"}</td>
                                <td>${charac["S"] || "-"}</td>
                                <td>${charac["AP"] || "-"}</td>
                                <td>${charac["D"] || "-"}</td>
                                <td>${charac["Keywords"] || "-"}</td>
                            </tr>`;
                    });
                    weaponsHtml += "</table>";
                }

                if (weapon.abilities.length > 0) {
                    weaponsHtml += "<ul>";
                    weapon.abilities.forEach(ability => {
                        weaponsHtml += `<li><strong>${ability.name}:</strong> ${ability.description}</li>`;
                    });
                    weaponsHtml += "</ul>";
                }
            });
            weaponsHtml += "</form>";
            $unitDetails.append(weaponsHtml);
        }

        if (unit.abilities.length > 0) {
            let abilitiesHtml = "<h3>Abilities</h3><form id='abilitySelection'>";
            unit.abilities.forEach(ability => {
                abilitiesHtml += `
                    <label>
                        <input type="checkbox" class="ability-checkbox" value="${ability.name}" checked>
                        <strong>${ability.name}:</strong> ${ability.description}
                    </label><br>`;
            });
            abilitiesHtml += "</form>";
            $unitDetails.append(abilitiesHtml);
        }

        $unitDetails.append(`<button id="addToListBtn">Add to my list</button>`);
    }

    parseXML(xml) {
        let models = [];
        const seenNames = new Set();
        $(xml).find('selectionEntry[type="unit"], selectionEntry[type="model"]').each(function () {
            const $entry = $(this);
            const name = $entry.attr('name');
            
            if (name === "Canoptek Acanthrite"  || name === "Convergence of Dominion Starstele" || name === "Triarch Praetorian" || name === "Ophydian Destroyer" || name === "Tomb Blade" || name === "Skorpekh Destroyer" || name === "Canoptek Spyder" || name === "Canoptek Scarab Swarm" || name === "Immortal" || name === "Cryptothrall" || name === "Deathmark" || name === "Flayed One" || name === "Lokhust Destroyer" || name.includes("w/")) {
                console.log(`Excluded unit: ${name}`);
                return;
            }

            if (seenNames.has(name)) {
                console.log(`Duplicate ignored: ${name}`);
                return;
            }
            seenNames.add(name);

            const $constraints = $entry.find('constraints constraint');
            let minModels = parseInt($constraints.filter('[type="min"]').attr('value') || 1, 10);
            let maxModels = parseInt($constraints.filter('[type="max"]').attr('value') || minModels, 10);
            const baseCost = parseInt($entry.find('cost[name="pts"]').attr('value') || '0', 10);

            // Generate cost steps
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

            const model = {
                name: name,
                id: $entry.attr('id'),
                characteristics: WarhammerModels.extractCharacteristics($entry),
                weapons: weapons,
                abilities: WarhammerModels.extractAbilities($entry),
                imageUrl: WarhammerModels.getImageUrl(name),
                cost: baseCost,
                minModels: minModels,
                maxModels: maxModels,
                modelCount: minModels,
                costSteps: costSteps
            };
            
            console.log("Parsed unit:", model); // For debugging
            models.push(model);
        });
        return models;
    }

    saveToCookie() {
        const armyData = JSON.stringify(this.selectedUnits);
        console.log("Saving to localStorage:", this.selectedUnits);
        localStorage.setItem("currentArmy", armyData);
    }

    loadFromCookie() {
        try {
            const armyData = localStorage.getItem("currentArmy");
            if (armyData) {
                const parsedData = JSON.parse(armyData);
                console.log("Loading from localStorage:", parsedData);
                return parsedData;
            }
            console.warn("No data found in localStorage 'currentArmy'");
            return [];
        } catch (e) {
            console.error("Error loading data from localStorage 'currentArmy':", e);
            return [];
        }
    }

    populateUnitSelector() {
        const $unitSelector = $("#unitSelector");
        $unitSelector.empty().append('<option value="">Choose a unit</option>');

        this.units.forEach(unit => {
            $unitSelector.append(`<option value="${unit.id}">${unit.name}</option>`);
        });

        $unitSelector.on("change", (event) => {
            const selectedUnit = this.units.find(unit => unit.id === event.target.value);
            if (selectedUnit) {
                this.displayUnitDetails(selectedUnit);
            } else {
                $("#unitDetails").empty();
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

        // 1. Extract weapons from direct upgrades
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

        // 2. Resolve entryLinks
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

        // 3. Add hardcoded weapons for specific units
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
                description: $profile.find('characteristic').first().text() || 'No description'
            });
        });
        return abilities;
    }

    static getImageUrl(unitName) {
        const associationTable = [
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
            ["Nemesor Zahndrekh [Legends]", "https://clic29-hobby.fr/10377-large_default/nemesor-zahndrekh-necrons.jpg"],
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
            ["Canoptek Wraiths", "https://th.bing.com/th?q=Warhammer%2040k%20Necron%20Canoptek%20Wraiths%20EXPERTLY%20PAINTED&w=400&h=400&c=7&pid=1.7&adlt=moderate&t=1"],
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
            ["Canoptek Acanthrite", "https://miniset.net/files/set/gw-99860110004-0.jpg"],
            ["Tesseract Ark [Legends]", "https://miniset.net/files/set/gw-99860110011-0.jpg"],
            ["Seraptek Heavy Construct", "https://www.warhammer.com/app/resources/catalog/product/threeSixty/99860110022_NecronCeraptekConstructwithSynaptecs360/01.jpg"],
            ["Gauss Pylon [Legends]", "https://artwork.40k.gallery/wp-content/uploads/2022/10/Gauss-Pylons.jpg"],
            ["Sentry Pylon [Legends]", "https://skaystore.ru/images/detailed/72/sentrypylonge1.jpg"],
            ["Night Shroud [Legends]", "https://ssl.images-ssl-mars.com/65463/2020/12/11/3/5/3544b9a0cd58b462.jpg"],
            ["Overlord with Translocation Shroud", "https://www.ludifolie.com/48162-thickbox_default/warhammer-40k-necrons-overlord-with-translocation-shroud.jpg"]
        ];
        const entry = associationTable.find(([name]) => name === unitName);
        return entry ? entry[1] : 'https://via.placeholder.com/150';
    }

    initLoginControls() {
        $("#loginBtn").on("click", () => this.login());
        $("#registerBtn").on("click", () => this.register());
        $("#logoutBtn").on("click", () => this.logout());
        $("#searchArmiesBtn").on("click", () => this.searchArmiesByUser());
        this.checkLoginStatus();
    }

    // Check if a user is already logged in (via localStorage for example)
    checkLoginStatus() {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.showMainInterface();
        } else {
            this.showLoginInterface();
        }
    }

    // Show the login interface
    showLoginInterface() {
        $("#loginSection").show();
        $("#loginForm").show();
        $("#userInfo").hide();
        $("#mainInterface").show();
        $("#armyHeader").hide();
    }

    // Show the main interface
    showMainInterface() {
        $("#loginForm").hide();
        $("#userInfo").show();
        $("#mainInterface").show();
        $("#armyHeader").show(); // Show controls after login
        this.populateUnitSelector();
        this.initArmyControls();
        $("#currentUserDisplay").text(`Logged in as: ${this.currentUser.username}`);
    }

    // Login
    login() {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (!username || !password) {
            alert("Please enter a username and password.");
            return;
        }

        $.ajax({
            url: "https://soundtable.fr/api/armies.php", // Adjust if you have a dedicated login endpoint
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password, action: "login" }), // Add an action field if needed
            success: (response) => {
                this.currentUser = { username, password };
                localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                this.showMainInterface();
            },
            error: (err) => {
                console.error("Error during login:", err);
                alert("Error during login. Please check your credentials.");
            }
        });
    }

    // Register
    register() {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (!username || !password) {
            alert("Please enter a username and password.");
            return;
        }

        $.ajax({
            url: "https://soundtable.fr/api/armies.php", // Adjust if separate endpoint
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password, action: "register" }),
            success: (response) => {
                alert("Account created successfully! Please log in now.");
            },
            error: (err) => {
                console.error("Error during registration:", err);
                alert("Error during account creation.");
            }
        });
    }

    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem("currentUser");
        this.showLoginInterface();
        this.selectedUnits = []; // Reset the list
        this.displaySelectedUnits();
        this.saveToCookie();
    }

    // Initialize army controls
    initArmyControls() {
        $("#saveArmyBtn").on("click", () => this.saveArmy());
        $("#loadArmyBtn").on("click", () => this.loadArmyList());
        $("#updateArmyBtn").on("click", () => this.updateArmy()); // New button for update
        $("#savedArmies").on("change", (event) => {
            const armyId = event.target.value;
            this.currentArmy = armyId;
            if (armyId) this.loadSelectedArmy(armyId);
        });
        this.loadArmyList();
    }

    // Save an army
    saveArmy() {
        if (!this.currentUser) {
            alert("You must be logged in to save an army.");
            return;
        }

        const armyName = $("#armyName").val().trim();
        const password = $("#password").val().trim();

        if (!armyName || !password) {
            alert("Please enter an army name and your password.");
            return;
        }

        if (this.selectedUnits.length === 0) {
            alert("No selected units to save.");
            return;
        }

        const armyData = {
            username: this.currentUser.username,
            password,
            armyName,
            units: this.selectedUnits.map(unit => ({
                name: unit.name,
                id: unit.id,
                characteristics: unit.characteristics,
                selectedWeapons: unit.selectedWeapons,
                selectedAbilities: unit.selectedAbilities,
                imageUrl: unit.imageUrl,
                modelCount: unit.modelCount,
                minModels: unit.minModels,
                maxModels: unit.maxModels,
                costSteps: unit.costSteps
            }))
        };

        console.log("Saving army data:", armyData);

        $.ajax({
            url: "https://soundtable.fr/api/armies.php",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(armyData),
            success: (response) => {
                alert("Army saved successfully!");
                this.loadArmyList();
            },
            error: (err) => {
                console.error("Error during save:", err);
                alert("Error saving the army.");
            }
        });
    }

    // Load the army list
    loadArmyList() {
        if (!this.currentUser) return;

        if (!this.currentUser.password) {
            alert("Please enter your password to load your armies.");
            return;
        }

        $.ajax({
            url: `https://soundtable.fr/api/armies.php?username=${this.currentUser.username}&password=${this.currentUser.password}`,
            method: "GET",
            success: (armies) => {
                const $savedArmies = $("#savedArmies").empty();
                $savedArmies.append('<option value="">Choose a saved army</option>');
                if (Array.isArray(armies) && armies.length > 0) {
                    armies.forEach(army => {
                        $savedArmies.append(`<option value="${army.id}">${army.army_name}</option>`);
                        if (this.currentUser.username === army.username) {
                            $savedArmies.find(`option[value="${army.id}"]`).after(
                                `<button class="deleteArmyBtn" data-army-id="${army.id}">Delete</button>`
                            );
                        }
                    });
                    $(".deleteArmyBtn").on("click", (e) => {
                        const armyId = $(e.target).data("army-id");
                        this.deleteArmy(armyId);
                    });
                } else {
                    $savedArmies.append('<option value="">No armies available</option>');
                }
            },
            error: (err) => {
                console.error("Error loading armies:", err);
                alert("Error loading armies.");
            }
        });
    }

    // Search armies by a specific user
    searchArmiesByUser() {
        const searchUsername = $("#searchUsername").val().trim();
        if (!searchUsername) {
            alert("Please enter a username to search for.");
            return;
        }

        $.ajax({
            url: `https://soundtable.fr/api/armies.php?username=${searchUsername}`,
            method: "GET",
            success: (armies) => {
                const $savedArmies = $("#savedArmies").empty();
                $savedArmies.append('<option value="">Choose a saved army</option>');
                if (Array.isArray(armies) && armies.length > 0) {
                    armies.forEach(army => {
                        $savedArmies.append(`<option value="${army.id}">${army.army_name} (${army.username})</option>`);
                        if (this.currentUser && this.currentUser.username === army.username) {
                            $savedArmies.find(`option[value="${army.id}"]`).after(
                                `<button class="deleteArmyBtn" data-army-id="${army.id}">Delete</button>`
                            );
                        }
                    });
                    $(".deleteArmyBtn").on("click", (e) => {
                        const armyId = $(e.target).data("army-id");
                        this.deleteArmy(armyId);
                    });
                } else {
                    $savedArmies.append('<option value="">No armies found for this user</option>');
                }
            },
            error: (err) => {
                console.error("Error during search:", err);
                alert("Error searching for armies.");
            }
        });
    }

    // Load a specific army
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
                console.log("Loaded units:", this.selectedUnits);
                this.displaySelectedUnits();
                this.saveToCookie();
            },
            error: (err) => {
                console.error("Error loading army:", err);
                alert("Error loading the army.");
            }
        });
    }

    // Delete an army
    deleteArmy(armyId) {
        if (!this.currentUser) {
            alert("You must be logged in to delete an army.");
            return;
        }

        const password = this.currentUser.password;
        if (!password) {
            alert("Please enter your password to delete an army.");
            return;
        }

        if (!confirm("Are you sure you want to delete this army?")) return;

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
                alert("Army deleted successfully!");
                this.loadArmyList();
            },
            error: (err) => {
                console.error("Error during deletion:", err);
                alert("Error deleting the army.");
            }
        });
    }

    // Update an army (owner only)
    updateArmy() {
        if (!this.currentUser) {
            alert("You must be logged in to update an army.");
            return;
        }

        const armyId = $("#savedArmies").val();
        const password = this.currentUser.password;
        if (!armyId || !password) {
            alert("Please select an army and enter your password.");
            return;
        }

        $.ajax({
            url: `https://soundtable.fr/api/armies.php?id=${armyId}&username=${this.currentUser.username}&password=${password}`,
            method: "GET",
            success: (army) => {
                if (army.username !== this.currentUser.username) {
                    alert("You can only update your own armies.");
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
                        selectedWeapons: unit.selectedWeapons,
                        selectedAbilities: unit.selectedAbilities,
                        imageUrl: unit.imageUrl,
                        modelCount: unit.modelCount,
                        minModels: unit.minModels,
                        maxModels: unit.maxModels,
                        costSteps: unit.costSteps
                    }))
                };

                // Delete then recreate for update
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
                                alert("Army updated successfully!");
                                this.loadArmyList();
                            },
                            error: (err) => {
                                console.error("Error during update:", err);
                                alert("Error updating the army.");
                            }
                        });
                    },
                    error: (err) => {
                        console.error("Error during deletion for update:", err);
                        alert("Error updating the army.");
                    }
                });
            },
            error: (err) => {
                console.error("Error checking army:", err);
                alert("Error checking the army.");
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
            warhammer.initLoginControls();
        },
        error: function () {
            console.error("Error loading the XML file");
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