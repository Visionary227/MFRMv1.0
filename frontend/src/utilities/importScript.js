const importScript = (resourceUrl) => {
  const script = document.createElement("script");
  script.scr = resourceUrl;
  script.async = true;
  document.body.appendChild(script);
};
export default importScript;
