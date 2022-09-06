import { UpdateMeta } from "./Metadata";
import Routes from "./Routes";
import Emit from "../Utils/Emit";

/*---------------------------------------------
                ROUNTING
-----------------------------------------------*/
export default class ROUTING {
  constructor() {
    this.AddLinkListeners();

    this.load = false;

    window.addEventListener("popstate", this.onPopState.bind(this));

    Routes[window.location.pathname]?.Manager.Vin({ PrevUrl: window.location.pathname, callback: () => {} });
  }
  AddLinkListeners() {
    const links = document.querySelectorAll("a[data-root]");

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();
        let { href } = link;

        this.GetURL(href);
      };
    });
  }

  GetURL(url) {
    if (url === window.location.href) return;
    if (this.load) return;
    this.load = true;
    let prevlocation = window.location.pathname;
    history.pushState(null, null, url);

    const Render = () => {
      Routes[window.location.pathname].Render(), this.AddLinkListeners();
    };
    Routes[prevlocation].Manager.Vout({
      NextShow: () =>
        Routes[window.location.pathname].Manager.Vin({
          PrevUrl: prevlocation,
          callback: () => (this.load = false),
          Render,
        }),
      NextUrl: window.location.pathname,
    });
  }

  onPopState(e) {
    e.preventDefault();
    this.GetURL(window.location.pathname);
  }
}
