import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
  authority: 'https://is4.omnisecurityportal.com',
  client_id: 'starterspa',
  redirect_uri: 'https://starterspa.omniuserportal.com/callback',
  response_type: 'id_token token',
  scope: 'openid profile omniapi',
  post_logout_redirect_uri: 'https://starterspa.omniuserportal.com/',
  automaticSilentRenew: true,
  silent_redirect_uri: 'https://starterspa.omniuserportal.com/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;



export default mgr;
