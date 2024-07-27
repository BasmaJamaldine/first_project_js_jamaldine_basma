let dataBase = [
    { nomcomplet: "Ismail Horre", email: "ismail5@email.com", age: 23, motPasse: "1666@38", montant: 900, historique: [], credit: 0 },
    { nomcomplet: "Basma Jamaldine", email: "basma@email.com", age: 22, motPasse: "basma123@", montant: 400, historique: [], credit: 0 }
]

class Utilisateur {
    constructor(nomComplet, email, age, motPasse) {
        this.nomComplet = nomComplet
        this.email = email
        this.age = age
        this.motPasse = motPasse
    }

    sinscrire() {
        const verificationNom = () => {
            let nom = prompt("Entrez votre nom complet").trim()
            while (nom && nom.replace(/\s+/g, '').length < 5) {
                nom = prompt("Le nom doit comporter au moins 5 caractères. Entrez votre nom à nouveau :").trim()
            }
            while (nom && /[\d@!#$%^&*(),.?":{}|<>]/.test(nom)) {
                nom = prompt("Le nom ne doit pas contenir de chiffres ou caractères spéciaux. Entrez votre nom à nouveau :").trim()
            }
            this.nomComplet = nom.split(' ').map(ele => ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()).join(' ')
            console.log(`votre nom complet est ${this.nomComplet}`);
        }

        const verificationEmail = () => {
            let email = prompt("Entrez votre email").trim().toLowerCase()
            let exist = dataBase.find(e => e.email === email)
            while (email && (email.includes(' ') || email.length < 10 || email.split('@').length !== 2 || email.startsWith('@') || exist)) {
                if (email.includes(' ')) {
                    email = prompt("Votre email ne doit pas contenir d'espaces. Entrez votre email à nouveau :").trim().toLowerCase()
                }
                if (email.length < 10) {
                    email = prompt("L'email doit comporter au moins 10 caractères. Entrez votre email à nouveau :").trim().toLowerCase()
                }
                if (email.split('@').length !== 2) {
                    email = prompt("L'email doit contenir une seule fois le caractère '@'. Entrez votre email à nouveau :").trim().toLowerCase()
                }
                if (email.startsWith('@')) {
                    email = prompt("L'email ne doit pas commencer par '@'").trim().toLowerCase()
                }
                if (exist) {
                    email = prompt("Cet email est déjà enregistré. Veuillez entrer un email unique :").trim().toLowerCase()
                }
                exist = dataBase.find(e => e.email === email)
            }
            this.email = email
            console.log(`votre email est ${this.email}`);
        }

        const verificationAge = () => {
            let age = prompt("Entrez votre âge").trim()
            while (age.replace(/\s+/g, '').length !== age.length || !/^\d+$/.test(age) || age.length > 2 || parseInt(age) <= 0) {
                if (age.replace(/\s+/g, '').length !== age.length) {
                    age = prompt("L'âge ne doit pas contenir d'espaces. Veuillez entrer un âge valide :").trim()
                } else if (!/^\d+$/.test(age)) {
                    age = prompt("L'âge ne doit contenir que des chiffres. Veuillez entrer un âge valide :").trim()
                } else if (age.length > 2) {
                    age = prompt("L'âge ne doit pas dépasser 2 caractères. Veuillez entrer un âge valide :").trim()
                } else if (parseInt(age) <= 0) {
                    age = prompt("L'âge doit être supérieur à 0. Veuillez entrer un âge valide :").trim()
                }
            }
            this.age = parseInt(age)
            console.log(`votre age est ${this.age}`)
        }

        const verificationMotPasse = () => {
            let motPasse = prompt("Entrez votre mot de passe").trim()
            while (motPasse.replace(/\s+/g, '').length !== motPasse.length || motPasse.length < 7 || !/[#@\-+*/]/.test(motPasse) || /\s/.test(motPasse)) {
                motPasse = prompt("Syntaxe du mot de passe incorrecte. Entrez votre mot de passe à nouveau :").trim()
            }
            this.motPasse = motPasse
        }

        const confirmMotPasse = () => {
            let confirmationMotPasse = prompt("Confirmez votre mot de passe").trim()
            return confirmationMotPasse === this.motPasse
        }

        verificationNom()
        verificationEmail()
        verificationAge()
        verificationMotPasse()

        if (confirmMotPasse()) {
            dataBase.push({
                nomcomplet: this.nomComplet,
                email: this.email,
                age: this.age,
                motPasse: this.motPasse,
                montant: 0,
                historique: [],
                credit: 0
            })
            alert("Inscription réussie !")
        } else {
            alert("Inscription échouée. Mot de passe incorrect.")
            return
        }
    }

    seConnecter() {
        let email = prompt("Entrez votre email").trim().toLowerCase()
        let motPasse = prompt("Entrez votre mot de passe").trim()

        let utilisateur = dataBase.find(e => e.email === email && e.motPasse === motPasse)

        if (utilisateur) {
            console.log("Email entré :", email)
            console.log("Mot de passe entré :", motPasse)
            alert("Vous êtes connecté ")
            console.log("Vous êtes connecté ");

            this.nomComplet = utilisateur.nomcomplet
            this.email = utilisateur.email
            this.age = utilisateur.age
            this.motPasse = utilisateur.motPasse
            this.montant = utilisateur.montant
            this.historique = utilisateur.historique
            this.credit = utilisateur.credit
            this.reduireCredit()
            let banque = new Banque(this)
            banque.menuBanque()
        } else {
            alert("Email ou mot de passe incorrect. Veuillez réessayer.")
        }

    }
    reduireCredit() {
        let utilisateur = dataBase.find(e => e.email === this.email)
        if (utilisateur && utilisateur.credit > 0) {
            let reduction = utilisateur.credit * 0.1
            utilisateur.montant -= reduction
            utilisateur.credit -= reduction
            if (utilisateur.credit < 0) {
                utilisateur.credit = 0
            }
            utilisateur.historique.push({ type: "Réduction crédit", montant: reduction })
            console.log()(`Réduction du crédit : ${reduction} dh. Nouveau solde EST ${utilisateur.montant} dh.`)
        }
    }

    changerMotdePasse() {
        let email = prompt("Entrez votre email")
        let user = dataBase.find(user => user.email === email)
        if (!user) {
            alert("Email non trouvé.")
            return
        }

        let newMotPasse = prompt("Entrez votre nouveau mot de passe:")
        let newConfirmationMotPasse = prompt("Confirmez votre nouveau mot de passe:")

        while (newMotPasse.replace(/\s+/g, '').length !== newMotPasse.length || newMotPasse.length < 7 || !/[#@\-+*/]/.test(newMotPasse) || /\s/.test(newMotPasse) || newMotPasse !== newConfirmationMotPasse) {
            if (newMotPasse !== newConfirmationMotPasse) {
                alert("Les mots de passe ne correspondent pas.")
            } else {
                alert("Mot de passe invalide. Il doit contenir au moins 7 caractères et un caractère spécial.")
            }
            newMotPasse = prompt("Entrez votre nouveau mot de passe:")
            newConfirmationMotPasse = prompt("Confirmez votre nouveau mot de passe:")
        }

        user.motPasse = newMotPasse
        alert("Mot de passe changé avec succès !")
        console.table(dataBase)
    }
}

class Banque {
    constructor(utilisateur) {
        this.utilisateur = utilisateur
    }
    // ? menu contient que les choix de banque
    menuBanque() {
        let choixBanque = prompt(`Bienvenue ${this.utilisateur.nomComplet} votre Montant actuel est ${this.utilisateur.montant} Dh\nChoisissez une option :\nDéconnexion\nRetrait d'argent\nDéposer de l'argent\nPrendre un crédit\nInvestir\nHistorique`).toLowerCase()
        while (choixBanque !== "déconnexion") {
            if (choixBanque.toLowerCase() === "retrait d'argent") {
                this.retrait()
            } else if (choixBanque.toLowerCase() === "déposer de l'argent") {
                this.depotDargent()
            } else if (choixBanque.toLowerCase() === "prendre un crédit") {
                this.credit()
            } else if (choixBanque.toLowerCase() === "investir") {

            } else if (choixBanque.toLowerCase() === "historique") {
                this.afficherHistorique()
            } else {
                alert("Choix non valide. Veuillez réessayer.")
            }
            choixBanque = prompt(`Bienvenue ${this.utilisateur.nomComplet} votre Montant actuel est ${this.utilisateur.montant} Dh\nChoisissez une option :\nDéconnexion\nRetrait d'argent\nDéposer de l'argent\nPrendre un crédit\nInvestir\nHistorique`).toLowerCase()
        }
        console.log("Vous êtes déconnecté")
        alert("Vous êtes déconnecté")
        menuPrincipal()
    }
    //? retrait d'argent
    retrait() {
        let montant = parseFloat(prompt("Entrez le montant "))
        if (montant <= this.utilisateur.montant) {
            this.utilisateur.montant -= montant;
            this.utilisateur.historique.push({ type: "Retrait", montant: montant });
            alert("Retrait réussi ")
            console.log("Retrait réussi ")
            console.log(`votre montant actuel est ${this.utilisateur.montant}` )
        } else {
            alert("Montant insuffisant ")

        }
    }
    //   ! credit
    credit() {
        if (this.utilisateur.credit > 0) {
            console.log(("Vous avez déjà un crédit en cours. Vous ne pouvez pas en prendre un autre."))
            return
        }

        let montantCreditPossible = this.utilisateur.montant * 0.2
        let montantCredit = parseFloat(prompt(`Vous pouvez demander un crédit allant jusqu'à ${montantCreditPossible} dh. Entrez le montant du crédit souhaité :`))

        if (typeof montantCredit !== 'number' || montantCredit <= 0 || montantCredit > montantCreditPossible) {
            alert("Montant de crédit invalide. Veuillez entrer un montant valide.")
            return
        }

        this.utilisateur.montant += montantCredit
        this.utilisateur.credit = montantCredit
        this.utilisateur.historique.push({ type: "Crédit", montant: montantCredit })
        console.log((`Crédit de ${montantCredit} dh accordé  Votre nouveau solde est ${this.utilisateur.montant} dh.`))
    }
    //*    depose d'argent
    depotDargent() {
        let montant = parseFloat(prompt("Entrez le montant à déposer :"))

        if ((/\s+/g, '').length !== montant.length || parseInt(montant) == 0 || parseInt(montant) > 1000 || typeof montant !== 'number') {
            if ((/\s+/g, '').length !== montant.length) {
                console.log(" le mondant ne doit pas contient des espace")
            }
            if (typeof montant !== 'number') {
                console.log(" le mondant  doit contient juste des chiffre")
            }
            if (parseInt(montant) == 0) {
                console.log(" le mondant ne doit pas egale 0")
            }
            if (parseInt(montant) > 1000) {
                console.log(" le mondant depasse 1000")
            }

        }

        if (parseInt(montant) <= 1000) {
            this.utilisateur.montant += montant
            this.utilisateur.historique.push({ type: "Dépôt", montant: montant })
            alert(`Vous avez déposé ${montant} Dhv otre Nouveau soldeEST ${this.utilisateur.montant} dh.`)
            console.log(`Dépôt de ${montant} Dh votre Nouveau solde est ${this.utilisateur.montant} Dh.`)
        } else {
            alert("Montant dépassant  1000 Dh.")
        }
    }
    investir() {
        let montantInvestissement = parseFloat(prompt("Entrez le montant à investir "))
        if (typeof montantInvestissement !== 'number' || montantInvestissement <= 0) {
            alert("Montant d'investissement invalide Assurez-vous que le montant est supérieur à 0.")
            return
        }
        if (montantInvestissement > this.utilisateur.montant) {
            alert("Vous n'avez pas assez de d'argent pour cet investissement.")
            return
        }
        this.utilisateur.montant -= montantInvestissement
        this.utilisateur.investissement = montantInvestissement
        this.utilisateur.totalInvestissement = 0
        this.utilisateur.historique.push({ type: "Investissement", montant: montantInvestissement })
        alert(`Vous avez investi ${montantInvestissement} Dh. Nouveau solde: ${this.utilisateur.montant} Dh.`)
        console.log(`Vous avez investi ${montantInvestissement} Dh. Nouveau solde: ${this.utilisateur.montant} Dh.`)
    }
    afficherHistorique() {
        let historique = this.utilisateur.historique.map((ele) => ` ${ele.type} : ${ele.montant} Dh`).join(' ')
        alert(`Historique d'utilisateur' est ${historique}`)
             console.log(`Historique d'utilisateur' est ${historique}`)
        
        if (this.utilisateur.historique.length === 0) {
            alert("Aucune transaction enregistrée")
            console.log("Aucune transaction enregistrée")
            return;
        }

       
    }
}
//**  menu li fih ga3 les choix f la premiére page
const menuPrincipal = () => {
    let choix = prompt("Choisissez une option :\nS'inscrire\nSe connecter\nChanger le mot de passe\nQuitter").trim()
    while (choix.toLowerCase() !== 'quitter') {
        if (choix.toLowerCase() === "s'inscrire") {
            let nouvelUtilisateur = new Utilisateur()
            nouvelUtilisateur.sinscrire()
            console.table(dataBase)
        } else if (choix.toLowerCase() === "se connecter") {
            let utilisateur = new Utilisateur()
            utilisateur.seConnecter()
        } else if (choix.toLowerCase() === 'changer le mot de passe') {
            let utilisateur = new Utilisateur()
            utilisateur.changerMotdePasse()
        } else {
            alert("Choix non valide. Veuillez réessayer.")
        }
        choix = prompt("Choisissez une option :\nS'inscrire\nSe connecter\nChanger le mot de passe\nQuitter").trim()
    }
    alert("Au revoir !")
}

menuPrincipal()
console.log(dataBase);
