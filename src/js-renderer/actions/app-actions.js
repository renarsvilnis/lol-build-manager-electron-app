var Biff = require("../biff");

// Request
var request = require("superagent");

var RecipeActions = Biff.createActions({
  recipeCreated: function (data) {
    var self = this;

    request
      .post("/recipes/create")
      .send({ recipe: data })
      .set("Accept", "application/json")
      .end(function () {
        self.dispatch({
          actionType: "RECIPE_CREATE",
          data: data
        });
      });
  },
  portionsChanged: function (data) {
    this.dispatch({
      actionType: "PORTIONS_CHANGED",
      data: data
    });
  },
});

module.exports = RecipeActions;
