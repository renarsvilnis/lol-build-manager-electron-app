'use strict';

import Biff from '../modules/biff';

let AppActions = Biff.createActions({
  recipeCreated: function (data) {
    var self = this;

    // request
    //   .post("/recipes/create")
    //   .send({ recipe: data })
    //   .set("Accept", "application/json")
    //   .end(function () {
    //     self.dispatch({
    //       actionType: "RECIPE_CREATE",
    //       data: data
    //     });
    //   });
  },

  portionsChanged: function (data) {
    this.dispatch({
      actionType: "PORTIONS_CHANGED",
      data: data
    });
  },
});

export default AppActions;