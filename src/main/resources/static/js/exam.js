/**
 * Created by st0001 on 2017/12/14.
 * 
 * 假设试题的json格式：
 * {
 * 	
 * }
 * 
 */
//var time = timeOff - timeOn;
//var testList = null;

$().ready(function() {
	
    var each = "<ul>";
    var eachID = '<ul>';
    
//    var title = null;
//    var description = null;
//    var num = null;
//    var optionA = null;
//    var optionB = null;
//    var optionC = null;
//    var optionD = null;
//    var type = null;

    //test
    var description = "1,1+1=?";
    var optionA = "1";
    var optionB = "2";
    var optionC = "3";
    var optionD = "4";
    var type = "multi";
    
    
//    while( testList.next()){
//    	title = testList.get();
//    	
//    	desccription = title.get();
//    	optionA = title.get();
//    	optionB = title.get();
//    	optionC = title.get();
//    	optionD = title.get();
//    	num = title.get();
//    	console.log(num);
//    	
//    	type = title.get();
    var i = 50;
    while (i > 0 ){
    	i--;
    	eachID += ' <li><a href="#qu_'+i+'">'+(i+1)+'</a></li><li><a id="#qu_'+i+'">&nbsp;</a></li>';
    	
    	each += '<li id="qu_'+i+'"><div class="test_content_nr_tt"><i>'+(i+1)+'</i><font>'
    	+ description +'</font>' +
    	'<input class="Label" type="button" value="标注"></div><div class="test_content_nr_main"><ul>' ;
    	
    	if (type=="single") {
    		
    		each +='<li class="option"><input type="radio" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_1"  value="A"/><label for="answer_'+i+'_option_1">A.' +
    		' <p class="ue" style="display: inline;">'
    		+ optionA + '</p></label></li>' +
    		'<li class="option"><input type="radio" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_2"  value="B"/><label for="answer_'+i+'_option_2">B.' +
    		'<p class="ue" style="display: inline;">'
    		+ optionB + '</p></label></li>' +
    		'<li class="option"><input type="radio" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_3"  value="C"/><label for="answer_'+i+'_option_3">C.' +
    		'<p class="ue" style="display: inline;">'
    		+ optionC + '</p></label></li>' +
    		'<li class="option"><input type="radio" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_4"  value="D"/><label for="answer_'+i+'_option_4">D.' +
    		' <p class="ue" style="display: inline;">'
    		+ optionD + '</p></label> </li></ul></div> </li>';
		} else if (type=="multi") {
			
			each += '<li class="option"><input type="checkbox" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_1" value="A"/><label for="answer_'+i+'_option_1">A. ' +
            '<p class="ue" style="display: inline;">'
			+ optionA + '</p></label></li>' +
            '<li class="option"><input type="checkbox" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_2" value="B"/><label for="answer_'+i+'_option_2">B. ' +
            '<p class="ue" style="display: inline;">'
            + optionB + '</p></label></li>' +
            '<li class="option"><input type="checkbox" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_3" value="C"/><label for="answer_'+i+'_option_3">C.' +
            '<p class="ue" style="display: inline;">'
            + optionC + '</p></label></li>' +
            '<li class="option"><input type="checkbox" class="radioOrCheck" name="answer'+i+'" id="answer_'+i+'_option_4" value="D"/><label for="answer_'+i+'_option_4">D. ' +
            '<p class="ue" style="display: inline;">'
            +optionD + '</p></label></li></ul></div></li>';
		}
        
    }

    each +='</ul>';
    eachID +='</ul>';
    
    $("#each").html(each);
    $("#eachID").html(eachID);
    
});

window.jQuery(function($) {
    "use strict";

    $('time').countDown({
        with_separators : false
    });
    $('.alt-1').countDown({
        css_class : 'countdown-alt-1'
    });
    $('.alt-2').countDown({
        css_class : 'countdown-alt-2'
    });

});


$(function() {
    $('li.option label').click(function() {
        var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
        var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
        var checkName =  $(this).closest('li').children('input').attr('name');
        var thisCheck =  $(this).closest('li').children('input').attr('id');
        var thisInput = document.getElementById(thisCheck);
        var isCheck = document.getElementById('#'+examId);
        var checkId = document.getElementsByName(checkName);
        isCheck.innerHTML = '';
        if (thisInput.type == 'radio') {
            isCheck.innerHTML = thisInput.value;
        }else{
            for(var i=0;i<4;i++) {
                if((checkId[i].checked==true&&checkId[i].id!=thisCheck)||(checkId[i].checked==false&&checkId[i].id==thisCheck)){
                    isCheck.innerHTML+=checkId[i].value;
                }
                //   console.log(checkId[i]);
            }
            if(isCheck.innerHTML=='')
                isCheck.innerHTML+="&nbsp;";
        }



    });
    $('input.Label').click(function(){
            var examId = $(this).closest('div').closest('li').attr('id'); // 得到题目ID
            var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
            var ques = $('li[id='+examId+']');
            if(!cardLi.hasClass('hasBeenAnswer')){
                ques.addClass('hasBeenAnswer');
                cardLi.addClass('hasBeenAnswer');
               this.value = "取消标注";
            }else{
                ques.removeClass('hasBeenAnswer');
                cardLi.removeClass('hasBeenAnswer');
                this.value = "标注";
            }
        }
    );


});