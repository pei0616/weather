const api = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B6C45ABA-EC1C-4318-B1D1-37436A0CCB0B';

$('#findButton').on('click',(e)=>{
    e.preventDefault();
    $('.alert').css('display','none');
    if($('#input_answer').val() !==""){
        fetch(api)
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



