let dataBase = [
    { nomcomplet: 'Ismail Horre', email: 'ismail5@email.com', age: 23, motPasse: '1666@38' }
];

class Utilisateur {
    constructor(nomComplet = '', email = '', age = 0, motPasse = '') {
        this.nomComplet = nomComplet;
        this.email = email;
        this.age = age;
        this.motPasse = motPasse;
    }

    sinscrire() {
        const verificationNom = () => {
            let nom = prompt("Entrez votre nom complet").trim();
            while (nom && nom.replace(/\s+/g, '').length < 5) {
                nom = prompt("Le nom doit comporter au moins 5 caractères. Entrez votre nom à nouveau :").trim();
            }
            while (nom && /[\d@!#$%^&*(),.?":{}|<>]/.test(nom)) {
                nom = prompt("Le nom ne doit pas contenir de chiffres ou caractères spéciaux. Entrez votre nom à nouveau :").trim();
            }
            this.nomComplet = nom.split(' ').map(ele => ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()).join(' ');
        };

        const verificationEmail = () => {
            let email = prompt("Entrez votre email").trim().toLowerCase();
            let exist = dataBase.find(e => e.email === email);
            while (email && (email.includes(' ') || email.length < 10 || email.split('@').length !== 2 || exist)) {
                if (email.includes(' ')) {
                    email = prompt("Votre email ne doit pas contenir d'espaces. Entrez votre email à nouveau :").trim().toLowerCase();
                }
                if (email.length < 10) {
                    email = prompt("L'email doit comporter au moins 10 caractères. Entrez votre email à nouveau :").trim().toLowerCase();
                }
                if (email.split('@').length !== 2) {
                    email = prompt("L'email doit contenir une seule fois le caractère '@'. Entrez votre email à nouveau :").trim().toLowerCase();
                }
                if (exist) {
                    email = prompt("Cet email est déjà enregistré. Veuillez entrer un email unique :").trim().toLowerCase();
                }
                exist = dataBase.find(e => e.email === email);
            }
            this.email = email;
        };

        const verificationAge = () => {
            let age = prompt("Entrez votre âge").trim();
            while (age.replace(/\s+/g, '').length !== age.length || !/^\d+$/.test(age) || age.length > 2 || parseInt(age) <= 0) {
                if (age.replace(/\s+/g, '').length !== age.length) {
                    age = prompt("L'âge ne doit pas contenir d'espaces. Veuillez entrer un âge valide :").trim();
                } else if (!/^\d+$/.test(age)) {
                    age = prompt("L'âge ne doit contenir que des chiffres. Veuillez entrer un âge valide :").trim();
                } else if (age.length > 2) {
                    age = prompt("L'âge ne doit pas dépasser 2 caractères. Veuillez entrer un âge valide :").trim();
                } else if (parseInt(age) <= 0) {
                    age = prompt("L'âge doit être supérieur à 0. Veuillez entrer un âge valide :").trim();
                }
            }
            this.age = parseInt(age);
        };

        const verificationMotPasse = () => {
            let motPasse = prompt("Entrez votre mot de passe").trim();
            while (motPasse.replace(/\s+/g, '').length !== motPasse.length || motPasse.length < 7 || !/[#@\-+*/]/.test(motPasse) || /\s/.test(motPasse)) {
                motPasse = prompt("Syntaxe du mot de passe incorrecte. Entrez votre mot de passe à nouveau :").trim();
            }
            this.motPasse = motPasse;
        };

        verificationNom();
        verificationEmail();
        verificationAge();
        verificationMotPasse();
       
        alert("Inscription réussie !");
    }
    seConnecter() {
        let email = prompt("Entrez votre email").trim().toLowerCase();
        let motPasse = prompt("Entrez votre mot de passe").trim();

        console.log("Email entré :", email);
        console.log("Mot de passe entré :", motPasse);

        let utilisateur = dataBase.find(e => e.email === email && e.motPasse === motPasse);

        if (utilisateur) {
            alert("Vous êtes connecté !");
        } else {
            alert("Email ou mot de passe incorrect. Veuillez réessayer.");
        }
    }
}

const menuPrincipal = () => {
    let choix = prompt("Choisissez une option :\nS'inscrire\nSe connecter\nChanger le mot de passe\nQuitter");
    while (choix.toLowerCase() !== 'quitter') {
        if (choix.toLowerCase() === "s'inscrire") {
            let nouvelUtilisateur = new Utilisateur();
            nouvelUtilisateur.sinscrire();
            console.table(dataBase);
        } else if (choix.toLowerCase() === "se connecter") {
            let utilisateur = new Utilisateur();
            utilisateur.seConnecter();
        } else if (choix.toLowerCase() === 'changer le mot de passe') {
           
        } else {
            alert("Choix non valide. Veuillez réessayer.");
        }
        choix = prompt("Choisissez une option :\nS'inscrire\nSe connecter\nChanger le mot de passe\nQuitter");
    }
    alert("Au revoir !");
}
dataBase.push({
    nomcomplet: this.nomComplet,
    email: this.email,
    age: this.age,
    motPasse: this.motPasse
});

menuPrincipal();