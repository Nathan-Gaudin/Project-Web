document.addEventListener("DOMContentLoaded", function() {

    // --- 1. BASE DE DONNÉES DES 24 AGENTS ---
    const infosAgents = {
        // DUELLISTES
        "Iso": { desc: "Assassin chinois spécialisé dans l'isolation de ses cibles. Il manipule l'énergie ambiante pour se protéger.", competences: ["Contingence (C)", "Sape (Q)", "Tir double (E)"], ulti: "Contrat de duel (X) - 7 points" },
        "Jett": { desc: "Originaire de Corée du Sud, Jett est un assassin agile qui privilégie le mouvement par rapport à la couverture.", competences: ["Averse (C)", "Courant Ascendant (Q)", "Vent Arrière (E)"], ulti: "Tempête de lames (X) - 7 points" },
        "Neon": { desc: "Originaire de Manille, Neon avance à des vitesses foudroyantes, générant des décharges bioélectriques.", competences: ["Voie de dépassement (C)", "Éclair relais (Q)", "Vitesse supérieure (E)"], ulti: "Survoltage (X) - 7 points" },
        "Phoenix": { desc: "Le prodige britannique Phoenix brille par son style de combat flamboyant, enflammant le champ de bataille.", competences: ["Brasier (C)", "Balle courbe (Q)", "Mains chaudes (E)"], ulti: "Revanche (X) - 6 points" },
        "Raze": { desc: "Raze adore les explosifs. Avec son style de jeu bourrin, elle excelle pour déloger les ennemis retranchés.", competences: ["Bot explosif (C)", "Pack explosif (Q)", "Grenade gigogne (E)"], ulti: "Bouquet final (X) - 8 points" },
        "Reyna": { desc: "Forgée au cœur du Mexique, Reyna domine en combat singulier et se nourrit des âmes de ses ennemis.", competences: ["Œillade (C)", "Dévoration (Q)", "Rebuffade (E)"], ulti: "Impératrice (X) - 6 points" },
        "Yoru": { desc: "Yoru est un natif du Japon qui ouvre des failles dans la réalité pour s'infiltrer derrière les lignes ennemies.", competences: ["Dédale (C)", "Angle mort (Q)", "Visite surprise (E)"], ulti: "Dérive dimensionnelle (X) - 7 points" },

        // CONTRÔLEURS
        "Astra": { desc: "L'agent ghanéenne Astra maîtrise les énergies du cosmos pour remodeler le champ de bataille à sa guise.", competences: ["Puits de gravité (C)", "Impulsion nova (Q)", "Nébuleuse/Dissipation (E)"], ulti: "Division cosmique (X) - 7 points" },
        "Brimstone": { desc: "Brimstone commande depuis les cieux. Son arsenal orbital garantit que son équipe a toujours l'avantage.", competences: ["Balise stimulante (C)", "Incendiaire (Q)", "Frappe fumigène (E)"], ulti: "Rayon orbital (X) - 7 points" },
        "Clove": { desc: "Originaire d'Écosse, Clove sème le trouble sur le champ de bataille, défiant la mort elle-même.", competences: ["Coup de boost (C)", "Ingérence (Q)", "Ruse (E)"], ulti: "Toujours debout (X) - 7 points" },
        "Harbor": { desc: "Venu de la côte indienne, Harbor commande l'eau grâce à des reliques anciennes pour bloquer la vision.", competences: ["Cascade (C)", "Crique (Q)", "Marée haute (E)"], ulti: "Déferlement (X) - 7 points" },
        "Omen": { desc: "Fantôme de la mémoire, Omen chasse dans l'ombre. Il aveugle les ennemis et se téléporte sur la carte.", competences: ["Voie des ombres (C)", "Paranoïa (Q)", "Voile sombre (E)"], ulti: "Depuis les ombres (X) - 7 points" },
        "Viper": { desc: "Chimiste américaine, Viper déploie des dispositifs chimiques toxiques pour contrôler le champ de bataille.", competences: ["Morsure du serpent (C)", "Nuage de poison (Q)", "Écran toxique (E)"], ulti: "Nid de vipères (X) - 8 points" },

        // INITIATEURS
        "Breach": { desc: "L'homme bionique suédois Breach tire des décharges cinétiques puissantes pour forcer les passages.", competences: ["Réplique (C)", "Éblouissement (Q)", "Faille sismique (E)"], ulti: "Onde de choc (X) - 8 points" },
        "Fade": { desc: "La chasseuse de primes turque Fade utilise le pouvoir des cauchemars pour traquer les secrets ennemis.", competences: ["Rôdeur (C)", "Capture (Q)", "Hanteur (E)"], ulti: "Nuit tombante (X) - 8 points" },
        "Gekko": { desc: "Originaire de Los Angeles, Gekko mène une bande de créatures calamiteuses qui harcèlent les ennemis.", competences: ["Potes au feu (C)", "Altego (Q)", "Vertigo (E)"], ulti: "Mordicus (X) - 7 points" },
        "KAY/O": { desc: "KAY/O est un robot de guerre construit dans un seul but : anéantir les radiants en neutralisant leurs compétences.", competences: ["FRAG/ment (C)", "MÉMOIRE/flash (Q)", "POINT/zéro (E)"], ulti: "CMD/null (X) - 8 points" },
        "Skye": { desc: "Originaire d'Australie, Skye est accompagnée de ses bêtes pour ouvrir la voie et soigner ses alliés.", competences: ["Pousse de soin (C)", "Éclaireur (Q)", "Guide de lumière (E)"], ulti: "Chercheurs (X) - 7 points" },
        "Sova": { desc: "Sova traque, trouve et élimine ses ennemis avec une efficacité redoutable et une précision impitoyable.", competences: ["Électroflèche (C)", "Flèche chouette (Q)", "Flèche de reconnaissance (E)"], ulti: "Fureur du chasseur (X) - 8 points" },

        // SENTINELLES
        "Chamber": { desc: "Le concepteur d'armes français Chamber repousse les assauts avec une précision mortelle et des armes personnalisées.", competences: ["Marque déposée (C)", "Chasseur de têtes (Q)", "Rendez-vous (E)"], ulti: "Tour de force (X) - 8 points" },
        "Cypher": { desc: "Le courtier en informations marocain Cypher est un réseau de surveillance à lui tout seul. Rien ne lui échappe.", competences: ["Fil de détente (C)", "Cybercage (Q)", "Caméra espionne (E)"], ulti: "Vol en piqué / Vol de neural (X) - 6 points" },
        "Deadlock": { desc: "Opératrice norvégienne, Deadlock déploie un arsenal de nanofils de pointe pour sécuriser le champ de bataille.", competences: ["Filet de gravité (C)", "Détecteur sonique (Q)", "Disque barrière (E)"], ulti: "Annihilation (X) - 7 points" },
        "Killjoy": { desc: "La prodige allemande Killjoy sécurise facilement le champ de bataille grâce à son arsenal d'inventions.", competences: ["Bot-Alarme (C)", "Tourelle (Q)", "Essaim de nanites (E)"], ulti: "Confinement (X) - 9 points" },
        "Sage": { desc: "Véritable forteresse chinoise, Sage assure la sécurité de son équipe en soignant et en bloquant les assauts.", competences: ["Orbe barrière (C)", "Orbe de lenteur (Q)", "Orbe de soin (E)"], ulti: "Résurrection (X) - 8 points" },
        "Vyse": { desc: "La manipulatrice de métaux liquides. Vyse utilise ses pièges pour isoler, désarmer et détruire ses ennemis.", competences: ["Rose de fer (C)", "Cisaille (Q)", "Ronce de métal (E)"], ulti: "Jardin d'acier (X) - 8 points" }
    };

    // --- 2. GESTION DE LA FENÊTRE MODALE ---
    const modal = document.getElementById("modal-agent");
    const boutonFermer = document.getElementById("fermer-modal");
    
    if (modal) {
        const lignesTableau = document.querySelectorAll("tbody tr");

        lignesTableau.forEach(ligne => {
            ligne.addEventListener("click", function() {
                const nom = this.cells[0].innerText;
                const role = this.cells[1].innerText;

                if (infosAgents[nom]) {
                    document.getElementById("modal-nom").innerText = nom;
                    document.getElementById("modal-role").innerText = "Rôle : " + role;
                    document.getElementById("modal-desc").innerText = infosAgents[nom].desc;
                    document.getElementById("modal-ulti").innerText = infosAgents[nom].ulti;

                    const listeComp = document.getElementById("modal-competences");
                    listeComp.innerHTML = ""; 
                    infosAgents[nom].competences.forEach(comp => {
                        const li = document.createElement("li");
                        li.innerText = comp;
                        listeComp.appendChild(li);
                    });

                    modal.classList.add("actif");
                }
            });
        });

        boutonFermer.addEventListener("click", function() {
            modal.classList.remove("actif");
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.classList.remove("actif");
            }
        });
    }

    // --- 3. VALIDATION DU FORMULAIRE DE RECRUTEMENT (Page contact) ---
    const monFormulaire = document.getElementById("formulaire-contact");
    if (monFormulaire) {
        monFormulaire.addEventListener("submit", function(event) {
            event.preventDefault();
            const riotId = document.getElementById("riotid").value;
            if (!riotId.includes("#")) {
                alert("Erreur : N'oublie pas le '#' dans ton Riot ID (ex: Pseudo#Tag).");
            } else {
                alert("Demande envoyée ! Nous examinerons ton profil, " + riotId + ".");
                monFormulaire.reset();
            }
        });
    }
});