// window.onload = sendApiRequest

function login(){
    var name = document.getElementById('user_name').value
    sessionStorage.setItem("Name",name)  
}

var list;

function sendApiRequest(id){
    retake_id=id    
    //fetch data from url
    var url
    $.getJSON("../static/url.json", function(data){
        for(var i=0;i<data.length;i++){
            if(data[i].id==id){
                url=data[i].url
            }
        }
        console.log(url)
        // load url data
        $.ajax({
            dataType: 'json',
            url: url,
            type: 'get',
            success: function(response){
                let res=response
                list=res.results
                console.log(list)
                localStorage.setItem('myData', JSON.stringify(list));
                location.href = '/startquiz';
            }
        });
    });     
}

var text="</ul>" ;
var answer;
var selected_answer;
var count = 0;
var corrected_answer = 0;
var wronged_answer = 0;
var answer_ind = 0;

var res_json = JSON.parse(localStorage.getItem('myData'));
function useApilist(res_json){
    $("#next_btn").hide()
    if(count<10){
        var quiz = res_json[count]
        answer = quiz.incorrect_answers
        answer.push(quiz.correct_answer)
        answer.sort(()=> Math.random()-0.5)
        text = [];
        for (j = 0; j < answer.length; j++) {
            text += "<li>" + answer[j] + "</li>";
          }
          text += "</ul>";
        document.getElementById("ques_number").innerHTML = count+1
        document.getElementById("question").innerHTML = quiz.question
        document.getElementById("answer").innerHTML = text    
                  
        $(document).ready(function(){
            $('.answer_list li').click(function(){
                if(count<9){
                    $("#next_btn").show()
                }
                if(count==9){
                    $(".submit").show()
                }
                selected_answer = $(this).text()
                if(quiz.correct_answer == selected_answer){
                    corrected_answer+=1;
                    answer_ind+=1;
                    $(this).addClass("correct")
                    updateIndicatorAnswer("correct")
                } else {
                    wronged_answer+=1;
                    answer_ind+=1;
                    $(this).addClass("wrong")
                    updateIndicatorAnswer("wrong")
                    
                    // show the correct ans
                    $(".correct_ans").show();
                    var len =$('.answer_list li').length;
                    for(k=0; k<len; k++){
                        if($('.answer_list li')[k].innerHTML==quiz.correct_answer){
                            var correct = $('.answer_list li')[k].innerHTML
                            document.getElementById("correct").innerHTML = correct 
                        }
                    }
                }
                unclickableoption();
            })
        })
    }
}

//prevent to click another option
function unclickableoption(){
    const len = answer.length;
    for(i=0; i<len; i++){
        $('.answer_list li').addClass("already-answered");
    }
}
function updateIndicatorAnswer(type){
    document.querySelector('.indicator').children[answer_ind-1].classList.add(type)
}

// next button
function Next(){
    $("#next_btn").hide()
    $(".correct_ans").hide();
    if(count<10){
        count++
        useApilist(res_json)
    } 
}

//submit fun
function Submit(){
    sessionStorage.setItem("correct_answer",corrected_answer )
    $(".quiz-bg").css("height","100vh")
    var message = sessionStorage.getItem("correct_answer")
    console.log(message)
    if(message <= 5){
        document.getElementById("message").value = "fail"
    }else{
        document.getElementById("message").value = "pass"
    }
    sessionStorage.setItem("wrong_answer",wronged_answer )
    document.getElementById("correct_ans").value = sessionStorage.getItem("correct_answer")
    document.getElementById("wrong").value = sessionStorage.getItem("wrong_answer")
    document.getElementById("user").value = sessionStorage.getItem("Name")  
}



// function btnName(){
//     if(localStorage.getItem("id")){
//         arr.push(localStorage.getItem("id"));
//         console.log(arr)
//         for(var i=0;i<arr.length;i++){
//             console.log("id - "+arr[i])
//             var data = arr[i]
//             console.log("data - "+data)
//             document.getElementById(data).innerHTML = "Retake Test";
//         }
//     }
// }
