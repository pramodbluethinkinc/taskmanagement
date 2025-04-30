<#import "template.ftl" as layout>
  <@layout.registrationLayout displayInfo=social.displayInfo; section>
    <#if section="title">
      ${msg("loginTitle",(realm.displayName!''))?no_esc}
      <#elseif section="form">
        <#if realm.password>
          <div class="row">
            <form id="kc-form-login" class="col s12" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">account_circle</i>
                  <input required id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off">
                  <label for="username">
                    ${msg("username")}
                  </label>
                </div>
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock</i>
                  <input required id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off">
                  <label for="password">
                    ${msg("password")}
                  </label>
                </div>
                <button class="btn waves-effect waves-light borderR btn-bg" name="login" id="kc-login" type="submit">
                  ${msg("doLogIn")}
                </button>
              </div>
            </form>
          </div>
        </#if>
    </#if>
  </@layout.registrationLayout>