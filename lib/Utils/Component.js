import getElements from "../Utils/Helpers";
export default class Component {
  constructor(selector) {
    this.element = getElements({ element: selector });
    this.create();
    this.addEventListeners();
  }

  create() {}

  addEventListeners() {}

  removeEventListeners() {}
}
