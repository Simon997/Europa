const FormSubmition = () => {
	let nb_soumissions = 0;

	let formulaire = document.querySelector('#formulaire');
	let email;
	let Button_Ok = formulaire[1];
	let confirmation = document.querySelector('.attente_confirmation');

	// VOIR TOUT LE CONTENU DE LA BASE DE DONNEES
	toutes_donnees();

	// Une fois le formulaire soumis
	Button_Ok.addEventListener('click', function (event) {
			event.preventDefault();
		
		if(nb_soumissions<1){
			if (formulaire[0].value !==""){
				if (validEmail(formulaire[0].value)==true){
					email = formulaire[0].value;
					if (envoi_donnees(email) == true){
						confirmation.innerHTML+="Le formulaire a été soumis avec succès";
						confirmation.classList.add("confirmation_formulaire");
						nb_soumissions++;
					}else{
						alert("ERROR REQUETE");
					}
				}else{
					alert("veuillez entrer une adresse mail valide");
				}
			}
		}

	});

}

function validEmail(mail) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
};

const envoi_donnees = (email) => {
			
		try {
			var settings = {
				"url": "https://ldp.dwsapp.io/mm4-europe/",
				"method": "POST",
				"timeout": 0,
				"headers": {
			 		"Content-Type": "application/json"
				},
				"data": "{\n\t\"Author\": \"Groupe01\",\n\t\"email\": \""+email+"\"}",
			};

			$.ajax(settings).done(function (response) {
				console.log("REQUETE API: ENVOI DES DONNÉES");
				console.log(response);
			});
			let result = true;
			return result;
		}
			
		catch(error) {
		  	console.error(error);
		  	let result = false;
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
			return result;
		}
}

const toutes_donnees = () => {

		console.log("REQUETE API: VISUALISATION DES MAILS");
		
		var settings = {
		  "url": "https://ldp.dwsapp.io/mm4-europe/_all_docs?include_docs=true",
		  "method": "GET",
		  "timeout": 0,
		};

		$.ajax(settings).done(function (response) {
			let tableau_donnees = response.rows;
			for(var i= 0; i< tableau_donnees.length; i++){
		  		if(tableau_donnees[i].doc.Author=="Groupe01"){
		  			console.log(tableau_donnees[i].doc.email);
		  		}
		  	}
		});
}