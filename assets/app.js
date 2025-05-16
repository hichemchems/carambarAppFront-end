document.addEventListener('DOMContentLoaded', () => {
    const blaguesQuestionReponse = [
        { question: "1 Quelle est la femelle du hamster ?", reponse: "L’Amsterdam" },
        { question: "2 Que dit un oignon quand il se cogne ?", reponse: "Aïe" },
        { question: "3 Quel est l'animal le plus heureux ?", reponse: "Le hibou, parce que sa femme est chouette." },
        { question: "4 Pourquoi le football c'est rigolo ?", reponse: "Parce que Thierry en rit" },
        { question: "5 Quel est le sport le plus fruité ?", reponse: "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes." },
        { question: "6 Que se fait un Schtroumpf quand il tombe ?", reponse: "Un Bleu" },
        { question: "7 Quel est le comble pour un marin ?", reponse: "Avoir le nez qui coule" },
        { question: "8 Qu'est ce que les enfants usent le plus à l'école ?", reponse: "Le professeur" },
        { question: "9 Quel est le sport le plus silencieux ?", reponse: "Le para-chuuuut" },
        { question: "10 Quel est le comble pour un joueur de bowling ?", reponse: "C’est de perdre la boule" }
    ];

    const blaguesContainer = document.getElementById('blaguesContainer');
    const boutonNouvelleBlague = document.getElementById('boutonNouvelleBlague');
    const popupReponse = document.getElementById('popupReponse');
    const contenuReponse = document.getElementById('contenuReponse');
    const fermerPopup = document.getElementById('fermerPopup');
    const imageReponseSrc = './assets/image/response.png';

    // Éléments de la modale
    const btnAjouterBlague = document.getElementById('ajouterBlagueBDD');
    const addJokeModal = document.getElementById('addJokeModal');
    const closeModalSpan = document.querySelector('.close-modal');
    const newBlagueInput = document.getElementById('NewBlague'); 
    const newResponseInput = document.getElementById('NewResponse');
    const ajoutBtn = document.getElementById('ajout-btn');

    // --- Fonctions existantes pour l'affichage des blagues ---
    function afficherBlagueAleatoireAvecReponse() {
        blaguesContainer.innerHTML = '';
        const indexAleatoire = Math.floor(Math.random() * blaguesQuestionReponse.length);
        const blagueAleatoire = blaguesQuestionReponse[indexAleatoire];

        const blagueDiv = document.createElement('div');
        blagueDiv.classList.add('blague-container');

        const questionElement = document.createElement('p');
        questionElement.textContent = blagueAleatoire.question;

        const imageElement = document.createElement('img');
        imageElement.src = imageReponseSrc;
        imageElement.classList.add('reponse-image');
        imageElement.addEventListener('click', function() {
            afficherReponse(blagueAleatoire.reponse);
        });

        blagueDiv.appendChild(questionElement);
        blagueDiv.appendChild(imageElement);
        blaguesContainer.appendChild(blagueDiv);
    }

    function afficherReponse(reponse) {
        contenuReponse.textContent = reponse;
        popupReponse.style.display = 'block';
    }

    function fermerLaPopup() {
        popupReponse.style.display = 'none';
    }

    // --- Fonctions de la modale d'ajout de blague ---
    function openModal() {
        addJokeModal.style.display = 'flex'; // Use flex to center the modal
    }

    function closeModal() {
        addJokeModal.style.display = 'none';
        // Réinitialiser les champs du formulaire lors de la fermeture
        newBlagueInput.value = '';
        newResponseInput.value = '';
    }

    function addNewJoke() {
        const blagueValue = newBlagueInput.value.trim();
        const responseValue = newResponseInput.value.trim();

        // Vérification si les champs sont vides
        if (blagueValue === '' || responseValue === '') {
            alert('Veuillez remplir tous les champs : Blague et Réponse.');
            return; // Arrête l'exécution de la fonction si les champs sont vides
        }

        const newJokeNumber = blaguesQuestionReponse.length + 1;
        blaguesQuestionReponse.push({
            question: `${newJokeNumber} ${blagueValue}`,
            reponse: responseValue
        });

        console.log('Nouvelle blague ajoutée :', { question: `${newJokeNumber} ${blagueValue}`, reponse: responseValue });
        console.log('Liste des blagues mise à jour :', blaguesQuestionReponse);

        // Réinitialiser les champs de la modale après l'ajout réussi
        newBlagueInput.value = '';
        newResponseInput.value = '';

        // Fermer la modale et afficher une nouvelle blague après l'ajout
        closeModal();
        afficherBlagueAleatoireAvecReponse();
    }

    // --- Gestionnaires d'événements ---

    // Initialisation et gestion des blagues existantes
    if (boutonNouvelleBlague && blaguesContainer && popupReponse && contenuReponse && fermerPopup) {
        boutonNouvelleBlague.addEventListener('click', afficherBlagueAleatoireAvecReponse);
        fermerPopup.addEventListener('click', fermerLaPopup);
        afficherBlagueAleatoireAvecReponse(); // Afficher une blague au chargement initial
    } else {
        console.error("Un ou plusieurs éléments HTML nécessaires pour les blagues n'ont pas été trouvés.");
    }

    // Gestion de la modale d'ajout de blague
    if (btnAjouterBlague && addJokeModal && closeModalSpan && newBlagueInput && newResponseInput && ajoutBtn) {
        btnAjouterBlague.addEventListener('click', openModal);
        closeModalSpan.addEventListener('click', closeModal);
        ajoutBtn.addEventListener('click', addNewJoke);

        // Fermer la modale si l'utilisateur clique en dehors du contenu
        window.addEventListener('click', (event) => {
            if (event.target === addJokeModal) {
                closeModal();
            }
        });
    } else {
        console.error("Un ou plusieurs éléments HTML nécessaires pour la modale n'ont pas été trouvés.");
    }
});