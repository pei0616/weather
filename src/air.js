//將檔案一起打包
import './scss/all.scss';
//查看resolve.modules指向的路徑是否有此模組，如果沒有設置resolve.modules，則預設配置為指向 node_modules 資料夾內
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';//可載入bootstrap.js和Popper.js
//bootstrap預設的載入路徑為bootstrap/dist/js/bootstrap.js，就沒有包含Popper.js
/*支援IE*/
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

$('#findButton').on('click',(e)=>{
    e.preventDefault();
    $('.alert').css('display','none');
    if($('#input_answer').val() !==""){
        window.fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B6C45ABA-EC1C-4318-B1D1-37436A0CCB0B')
        .then((response)=>{
            console.log(response);
            if(response.ok){
                return response.json();
            }
            throw new Error('network response was not ok');
        })
        .then(jsonInfo=>{
            var location= jsonInfo['records']['location'];
            console.log(location);
            var description='';
            for(var i=0;i<location.length;i++){
                if($('#input_answer').val()===location[i]['locationName']){
                    var weather=location[i]['weatherElement'][0]['time'];
                   for(var j=0;j<weather.length;j++){
                        description += '<strong>'+weather[j]['startTime']+' ~ '+weather[j]['endTime']+'</strong><br />'
                                        +weather[j]['parameter']['parameterName']+'<br />';
                   }
                    $('#success').html(description).fadeIn();
                }   
            }
            if(description===''){
                $('#fail').fadeIn();
            }
        })
        .catch(e=>{
            throw new Error(e);
        })
    }else{
        $('#empty').fadeIn();
    }
})

console.log(process.env);
console.log(process.env.NODE_ENV);


