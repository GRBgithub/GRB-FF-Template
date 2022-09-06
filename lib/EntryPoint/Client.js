import ROUTING from "../Routing/Router";
import Routes from "../Routing/Routes";
import DEBUG from "../Controllers/DEBUG";
import TIME from "../Controllers/TIME";
import SIZES from "../Controllers/SIZES";
import "../../GlobalStyles/index.scss";
class APP {
  constructor() {
    new ROUTING();
    new DEBUG();
    new TIME();
    new SIZES();
  }
}

const Csr = async () => {
  for (const [key, value] of Object.entries(Routes)) {
    if (window.location.pathname === key) {
      value.Render();
    }
  }

  new APP();
};
Csr();
