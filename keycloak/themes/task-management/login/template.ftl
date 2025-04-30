<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset=" utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>
            <#nested "title">
        </title>
        <link rel="shortcut icon" href="${url.resourcesPath}/img/taskmanagement.svg" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <!-- Add this line -->
        <#if properties.styles?has_content>
            <#list properties.styles?split(',') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
            </#list>
        </#if>
    </head>

    <body class="template">
        <img src="${url.resourcesPath}/img/bg.webp" class="img-bg" />
        <div class="container wrapperC">
            <div id="kc-form" class="card borderR">
                <div class="card-content">
                    <span class="card-title">
                        <img src="${url.resourcesPath}/img/taskmanagement.svg" class="responsive-img">
                        <span class="content">
                            <#nested "title">
                        </span>
                    </span>
                    <div id="kc-form-wrapper">
                        <#nested "form">
                    </div>
                </div>
                <#if displayMessage && message?has_content>
                    <div class="card-panel red lighten-2">
                        ${message.summary}
                    </div>
                </#if>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </body>

    </html>
</#macro>