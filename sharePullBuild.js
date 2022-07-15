/* sharePullBuild.js by Jason Duncan
 *
 * Generate links to TeamCity builds/github pull requests in markdown format for
 * sharing via MS Teams.
 *
 * Make sure you're visiting the Dependencies tab of Build & Test Pull Request
 * in TC for your pull.
 */

(()=>{
  const params = new URLSearchParams(window.location.search);
  const buildType = 'MapCallPullRequests_FullBuild';
  const tab = 'dependencies';
  const location = window.location.href;
  if ((!location.includes(buildType) || params.get('buildTab') != tab) &&
      (params.get('buildTypeId') != buildType || params.get('tab') != tab)) {
    alert('You must be on the "Dependencies" tab of a TC Build & Test Pull Request build for this to work');
    return;
  }
  const pull = document.querySelector('a[data-test-branch-link=true]').text;
  const textArea = document.createElement("textarea");
  textArea.value = `[${pull}](https://github.com/American-Water/mapcall-monorepo/${pull}) - [passing TC build](${location})`;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  new Promise((res, rej) => {
    document.execCommand('copy') ? res() : rej();
    textArea.remove();
  }).then(() => alert('Copied link message to clipboard!'));
})();
