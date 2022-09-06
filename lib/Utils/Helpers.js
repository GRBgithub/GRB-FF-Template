export const getrandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
export const randomizeArray = (array) => {
  var i, j, tmp;
  for (i = array.length - 1; i > 0; i--) {
    j = getrandomInt(i + 1);
    tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
};
export const Log = (data, file) => {
  if (process.env.NODE_ENV === "development") {
    console.log(file, data);
  }
};
export const normalizeValue = (val, max, min) => {
  return (val - min) / (max - min);
};
export const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};
export const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};
export const getElements = (data) => {
  const elements = {};
  for (const [key, entry] of Object.entries(data)) {
    if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
      elements[key] = entry;
    } else {
      elements[key] = document.querySelectorAll(entry);
      if (elements[key].length === 0) {
        elements[key] = null;
      } else if (elements[key].length === 1) {
        elements[key] = document.querySelector(entry);
      }
    }
  }

  return elements;
};
export const limitNumberWithinRange = (num, min, max) => {
  const MIN = min || 1;
  const MAX = max || 100;
  const parsed = parseInt(num);
  return Math.min(Math.max(parsed, MIN), MAX);
};

export const SplitTextSpan = (expression) => {
  let x = expression.split("<br>");
  let w = "";

  x.forEach((e) => {
    Array.from(e).forEach((letter) => {
      if (letter === " ") {
        w += `${letter}`;
      } else {
        w += `<span>${letter}</span>`;
      }
    });
    w += "<br>";
  });
  return w;
};
export const SplitTextSpanArray = (expression) => {
  let x = expression.split("<br>");
  let w = [];

  x.forEach((e) => {
    Array.from(e).forEach((letter) => {
      if (letter === " ") {
        w.push(`${letter}`);
      } else {
        w.push(`<span>${letter}</span>`);
      }
    });
    w.push("<br>");
  });
  return w;
};
export const SplitParagraph = (expression) => {
  let x = expression.split("<br>");
  let w = "";

  x.forEach((e) => {
    w += `<span>${e}</span>`;
    w += "<br>";
  });

  return w;
};
export const GenerateKey = () => {
  return `${getrandomInt(999999999)}${getrandomInt(999999999)}${getrandomInt(999999999)}`;
};
export const Nextcheckroutes = ({ url, router }) => {
  let x = "";
  if (url === "/" || router?.asPath === "/") {
    return "Work";
  }
  if (url) {
    x = url.split("/")[3];
  }
  if (router) {
    x = router.asPath.split("/")[3];
  }
  return capitalizeFirstLetter(x);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function CreateObserver(element, actionin, actionout) {
  let x = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        actionin(entry);
      } else {
        actionout(entry);
      }
    });
  });
  x.observe(element);
}
export const ArrayRemover = (array, elem) => {
  return array.filter((item) => item !== elem);
};
export const IsMobile = () => {
  // return (window.mobileAndTabletCheck = function () {
  //   let check = false;
  //   (function (a) {
  //     if (
  //       /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
  //         a
  //       ) ||
  //       /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
  //         a.substr(0, 4)
  //       )
  //     )
  //       check = true;
  //   })(navigator.userAgent || navigator.vendor || window.opera);
  //   return check;
  // });
};
export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
export const pourcentage = (percent, total) => {
  return (100 * percent) / total;
};

export const EasingFunctions = {
  // no easing, no acceleration
  linear: (t) => t,
  // accelerating from zero velocity
  easeInQuad: (t) => t * t,
  // decelerating to zero velocity
  easeOutQuad: (t) => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: (t) => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: (t) => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  // accelerating from zero velocity
  easeInQuart: (t) => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: (t) => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  easeInQuint: (t) => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
};

export const useForm = (initialValues) => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    (name) => {
      if (values[name]) return values[name];
      return "";
    },
    (body) => {
      setValues(body);
    },
  ];

  /*   
  const [values, setValues, getValue,setinitialvalues] = useForm({});
  
   <input type="text"  name="name"  id="name"
     value={getValue("name")}
     onChange={setValues}
   />;
   */
};
