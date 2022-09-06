const Routes = [];
import * as HomeConfig from "../../src/Views/Home/Config";
import * as TestConfig from "../../src/Views/Test/Config";

//Import
Routes[HomeConfig.Route] = { ...HomeConfig, Manager: new HomeConfig.Manager() };
Routes[TestConfig.Route] = { ...TestConfig, Manager: new TestConfig.Manager() };

//Routes

export default Routes;

//Don't use your formatter in this file
