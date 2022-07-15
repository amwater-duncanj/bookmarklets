/* shareTicket.js by Jason Duncan
 *
 * Generate links to Jira tickets in markdown format for sharing via MS Teams.
 *
 * Make sure you're browsing a ticket for your project in Jira.
 */

(()=>{
  const location = window.location.href;
  if (!location.includes('atlassian.net/browse/')) {
    alert('You must be on a Jira ticket page for this to work');
    return;
  }
  const ticket = location.match(/browse\/([^/]+)/)[1];
  navigator.clipboard
    .writeText(`[${ticket}](${location})`)
    .then(() => alert('Copied link message to clipboard!'));
})();
