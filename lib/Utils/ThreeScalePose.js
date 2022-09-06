const createBounds = ({ element, mesh, Cwidth, Cheight }) => {
  let bounds = element.getBoundingClientRect();

  updateScale({ bounds, mesh, Cwidth, Cheight });
  updateX({ bounds, mesh, Cwidth });
  updateY({ bounds, mesh, Cheight });
  return bounds;
};
const updateScale = ({ bounds, mesh, Cwidth, Cheight }) => {
  let height = bounds.height / window.innerHeight;
  let width = bounds.width / window.innerWidth;

  mesh.scale.x = Cwidth * width;
  mesh.scale.y = Cheight * height;
};

const updateX = ({ bounds, mesh, x = 0, Cwidth }) => {
  x = (bounds.left + x) / window.innerWidth;

  mesh.position.x = -Cwidth / 2 + mesh.scale.x / 2 + x * Cwidth;
};

const updateY = ({ bounds, mesh, y = 0, Cheight }) => {
  y = (bounds.top - y) / window.innerHeight;

  mesh.position.y = Cheight / 2 - mesh.scale.y / 2 - y * Cheight;
};

const meshToHtmlBounds = (mesh) => {
  let width = (mesh.scale.x * window.innerWidth) / window.CANVAS.Camera.width;
  let height = (mesh.scale.y * window.innerHeight) / window.CANVAS.Camera.height;
  let top =
    ((mesh.position.x - (-window.CANVAS.Camera.width / 2 + mesh.scale.x / 2)) * window.innerWidth) /
    window.CANVAS.Camera.width;
  let left =
    ((mesh.position.y - (window.CANVAS.Camera.height / 2 - mesh.scale.y / 2)) * window.innerHeight) /
    window.CANVAS.Camera.height;

  return {
    width: Math.abs(width),
    height: Math.abs(height),
    left: Math.abs(left),
    top: Math.abs(top),
  };
};

const GetBounds = ({ element, Cwidth, Cheight }) => {
  let bounds = element.getBoundingClientRect();

  let scale = GetScale({ bounds, Cwidth, Cheight });
  let x = GetX({ bounds, Cwidth, scale });
  let y = GetY({ bounds, Cheight, scale });

  return { bounds, x, y, scale };
};
const GetScale = ({ bounds, Cwidth, Cheight }) => {
  let height = bounds.height / window.innerHeight;
  let width = bounds.width / window.innerWidth;

  return {
    width: Cwidth * width,
    height: Cheight * height,
  };
};

const GetX = ({ bounds, Cwidth, scale }) => {
  let x = bounds.left / window.innerWidth;

  return -Cwidth / 2 + scale.width / 2 + x * Cwidth;
};

const GetY = ({ bounds, Cheight, scale }) => {
  let y = bounds.top / window.innerHeight;
  return Cheight / 2 - scale.height / 2 - y * Cheight;
};

export { createBounds, updateScale, updateX, updateY, meshToHtmlBounds, GetBounds, GetScale, GetX, GetY };
