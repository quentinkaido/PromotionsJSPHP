/* this file contains CRUD functions for promotions*/

// Read function for promotions
var getPromotions = function() {
  // Creation of the XHR / API call / call / request ... object
  var request = new XMLHttpRequest();
  // open (méthode, URL à taper, asynchrone true/false)
  request.open('GET', url + "promotions.php", true);
  // what do we do when the request is done ?
  // e is event information (you can have a look with a console.log if it pleases you)
  request.onreadystatechange = function(e) {
    // First step
    // for the moment we write the raw response text in app
    // the whole data of the response is in a variable calles "this"
    // app.innerHTML = this.responseText;

    // Better step
    // promotionsJSON contains the JSON of the promotions
    // app.innerHTML = "<ul>";
    // if (this.readyState == XMLHttpRequest.DONE) {
    //   var promotionsJSON = this.responseText;
      // console.log("promotionsJSON:" + promotionsJSON);
      // promotions contains an array with the promotions
      // var promotions = JSON.parse(promotionsJSON);
      // console.log("promotions");
      // console.log(promotions);
      // console.log("name of first promotion");
      // console.log(promotions[0].name);
      // For each promotion, we display information
      // promotions.forEach(function(promotion) {
        // console.log(promotion);
    //     app.innerHTML += "<li>" + promotion.name + "</li>";
    //   });
    // }
    // app.innerHTML += "</ul>";

    // Best step
    if (this.readyState == XMLHttpRequest.DONE) {
      var promotions = JSON.parse(this.responseText);
      app.innerHTML = "<fieldset><legend>Liste des promotions</legend>";
      promotions.forEach(function(promotion) {
        app.innerHTML += '<div class="form-group">';
        app.innerHTML += '<label class="col-md-4 control-label" for="edit_button">' + promotion.name + '</label>';
        app.innerHTML += '<div class="col-md-8">';
        app.innerHTML += '<a onclick="" class="btn btn-success">Éditer</a> ';
        app.innerHTML += '<a onclick="" class="btn btn-danger">Supprimer</a>';
        app.innerHTML += '</div>';
        app.innerHTML += '</div>';
      });
      app.innerHTML += "</fieldset>";
    }
  };
  // app.innerHTML = "<div class='alert alert-success'>ici les promotions</div>";
  // at this point, we have done nothing yet. We launch the request now
  request.send();
}

// Create promotion form
var createPromotionForm = function() {
  // app.innerHTML = "Here be a promotion creation form";
  app.innerHTML = '<fieldset>';
  app.innerHTML += '<legend>Créer une promotion</legend>';
  app.innerHTML += '<div class="form-group">';
  app.innerHTML += '<label class="col-md-4 control-label" for="promotionname">Nom de la promotion</label>';
  app.innerHTML += '<div class="col-md-4">';
  // The name of the promotion is in this input field's value
  app.innerHTML += '<input id="promotionname" name="promotionname" placeholder="Nom de la promotion" class="form-control input-md" required="" type="text">';
  app.innerHTML += '<span class="help-block">Indiquez ici le nom de la promotion</span>';
  app.innerHTML += '</div>';
  app.innerHTML += '</div>';
  app.innerHTML += '<div class="form-group">';
  app.innerHTML += '<label class="col-md-4 control-label" for="validate"></label>';
  app.innerHTML += '<div class="col-md-4">';
  // We call the createPromotion function with document... as promotionNames's value
  app.innerHTML += '<button onclick="createPromotion(document.getElementById(\'promotionname\').value);" class="btn btn-primary">Valider</button>';
  app.innerHTML += '</div>';
  app.innerHTML += '</div>';
  app.innerHTML += '</fieldset>';
};

// Create function for ptomotions
var createPromotion = function(promotionName) {
  console.log("You tried to create a promotion " + promotionName);
  // We forge an object called promotion
  var promotion = {
    "name": promotionName,
    "startdate": "2018-01-01",
    "enddate": "2018-06-30",
  };
  var promotionJSON = JSON.stringify(promotion);
  // Check of the promotion variable
  console.log(promotion);
  // Check of the promotion JSON variable
  console.log(promotionJSON);

  // We create request object
  var request = new XMLHttpRequest();
  // We prepare parameters
  var parameters = "promotion=" + promotionJSON;
  // We establish connection, but don't launch a proper request
  request.open("POST", url + "create_promotion.php", true);
  // We warn that we will send parameters
  request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  // We tell the request what it will have to do when it's over
  request.onreadystatechange = function(e) {
    if (this.readyState == XMLHttpRequest.DONE) {
      console.log(this);
      var responseCode = JSON.parse(this.response);
      if (responseCode == "success") {
        app.innerHTML = "<div class='alert alert-success'>Promotion " + promotionName + "créée</div>"
      }
      else if (responseCode == "failure") {
        app.innerHTML = "<div class='alert alert-warning'>Promotion " + promotionName + "non-créée</div>"
      }
      else {
        app.innerHTML = "<div class='alert alert-danger'>Oups ! Quelque chose sur le serveur, contactez l'administrateur</div>"
      }
    }
  };
  // We launch the request for real, this time
  request.send(parameters);
};

// Delete promotion form
var deletePromotionForm = function(promotionId, promotionName) {
  app.innerHTML = '<fieldset>';
  app.innerHTML += '<legend>Supprimer une promotion</legend>';
  app.innerHTML += '<div class="form-group">';
  app.innerHTML += '<label class="col-md-4 control-label" for="promotionname">Nom de la promotion</label>';
  app.innerHTML += '<div class="col-md-4">';
  app.innerHTML += '<input id="promotionname" name="promotionname"'  +
  'placeholder="Nom de la promotion" class="form-control input-md"' +
  'required="" value=""' +
  'type="text" disabled="true">';
  app.innerHTML += '</div>';
  app.innerHTML += '</div>';
  app.innerHTML += '<div class="form-group">';
  app.innerHTML += '<label class="col-md-4 control-label" for="user_validation">Êtes-vous sûr de vouloir supprimer cette promotion ?</label>';
  app.innerHTML += '<div class="col-md-4">';
  app.innerHTML += '<div class="checkbox">';
  app.innerHTML += '<label for="user_validation-0">';
  app.innerHTML += '<input name="user_validation" id="user_validation-0" value="1" type="checkbox" />';
  app.innerHTML += ' Oui, je suis certain';
  app.innerHTML += '</label>';
  app.innerHTML += '</div>';
  app.innerHTML += '</div>';
  app.innerHTML += '</div>';
  app.innerHTML += '<div class="form-group">';
  app.innerHTML += '<label class="col-md-4 control-label" for="validate"></label>';
  app.innerHTML += '<div class="col-md-4">';
  app.innerHTML += '<input type="hidden" name="id" value="" />';
  app.innerHTML += '<button id="validate" name="validate" class="btn btn-primary">Valider</button>';
  app.innerHTML += '</div>';
  app.innerHTML += '</div>';
  app.innerHTML += '</fieldset>';
};
