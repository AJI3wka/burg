;
"use strict";
/**
 * [async_load_js асинхронная поочередная загрузка js, вставляет в head js, ждет его readystate и вставляет следуюющий и так по всему массиву скриптов]
 * @param  {Array} n [массив js для загрузки]
 */
function async_load_js(n) {
    var e = document;
    var t = "script";
    function r() {
        for (; u[0] && "loaded" == u[0][l];){
            o = u.shift();
            o[f] = !a.parentNode.insertBefore(o, a);
        }
    }
    for (var i, s, o, u = [], a = e.scripts[0], f = "onreadystatechange", l = "readyState"; i = n.shift();) s = e.createElement(t), "async" in a ? (s.async = !1, e.head.appendChild(s)) : a[l] ? (u.push(s), s[f] = r) : e.write("<" + t + ' src="' + i + '" defer></' + t + ">"), s.src = i
};

!function () {
    console.log('inited');

    var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    if (isMobile) {
        document.body.classList.add('mobile_view');
    }
    /**
     * [loadCSS - функция для асинхронной загрузки css]
     */
    ! function(e) {
        var n = function(n, t, o) {
            function i(e) {
                return f.body ? e() : void setTimeout(function() {
                    i(e)
                })
            }
            var d, r, a, l, f = e.document,
                s = f.createElement("link"),
                u = o || "all";
            return t ? d = t : (r = (f.body || f.getElementsByTagName("head")[0]).childNodes, d = r[r.length - 1]), a = f.styleSheets, s.rel = "stylesheet", s.href = n, s.media = "only x", i(function() {
                d.parentNode.insertBefore(s, t ? d : d.nextSibling)
            }), l = function(e) {
                for (var n = s.href, t = a.length; t--;)
                    if (a[t].href === n) return e();
                setTimeout(function() {
                    l(e)
                })
            }, s.addEventListener && s.addEventListener("load", function() {
                this.media = u
            }), s.onloadcssdefined = l, l(function() {
                s.media !== u && (s.media = u)
            }), s
        };
        "undefined" != typeof exports ? exports.loadCSS = n : e.loadCSS = n
    }("undefined" != typeof global ? global : this);


    //ниже блок загрузки css. ВАЖНО!!! не удалять/редактировать строчки с "//!important" они используются при упаковке
    

    loadCSS("//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700:latin,cyrillic");
    loadCSS(source_url+"/css/libs.css"); //!important
    loadCSS(source_url+"/css/main.css"); //!important
    //loadCSS(source_url+"/css/full.css");         //!important
    console.log('css-append');

    if (!window.atom_spa_inited) {
        window.atom_spa_inited = true;
        //массив начальных скриптов
        var start_scripts = [
            source_url+"/js/libs.js",
            source_url+"/js/main.js"
        ];

        //асинхронная загрузка начальных скриптов
        async_load_js(start_scripts);

        console.log('main-js.injected');
    }else{

        open_part('508');
    }

}();