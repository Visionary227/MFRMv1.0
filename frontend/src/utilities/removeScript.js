const removeScript = (scriptToremove) => {
    let allSuspects = document.getElementsByTagName("script");
    for (let i = allSuspects.length; i >= 0; i--) {
        if (allSuspects[i] && allSuspects[i].getAttribute("src") !== null
            && allSuspects[i].getAttribute('src').indexOf(`${scriptToremove}`) !== -1) {
            allSuspects[i].parentNode.removeChild(allSuspects[i]);
        }
    }
}
export default removeScript;