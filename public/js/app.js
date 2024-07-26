class Utilisateur{
    constructor(nomComplet,email,age,motPasse){
        this.nomComplet=nomComplet
        this.email=email
        this.age=age
        this.motPasse=motPasse
    }
  
   
    verificationNom() {
        let nom = prompt("Entrez votre nom").trim();
        while (nom.replace(/\s+/g, '').length < 5) {
            nom = prompt("Le nom doit comporter au moins 5 caractères. Entrez votre nom à nouveau :").trim();
        }
        while (/[\d@!#$%^&*(),.?":{}|<>]/.test(nom)) {
            nom = prompt("Le nom ne doit pas contenir de chiffres, '@' ou caractères spéciaux. Entrez votre nom à nouveau :").trim();
        }
        
        this.nomComplet = nom.split(' ').map(ele => ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()).join(' ');
        
        console.log(`Nom enregistré : ${this.nomComplet}`);
    }
}

// Création d'une instance de la classe avec des valeurs d'exemple
let insta = new Utilisateur('', 'john@example.com', 30, 'motdepasse123');
insta.verificationNom();