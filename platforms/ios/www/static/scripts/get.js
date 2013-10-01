function new_notif_html(id, title, image, date) {

    if (image == "default.jpg") {

        return '<li><a href="#post" onclick="get_post('+id+')" data-transition="slideup"><div class="inside-li"><h2>'+title+'</h2><p>'+moment(date, "DD-MM-YYYY").format("DD MMM YYYY")+'</p></div><img src="static/images/default.jpg" width="100%"></a></li>' ;

    }else{

        return '<li><a href="#post" onclick="get_post('+id+')" data-transition="slideup"><div class="inside-li"><h2>'+title+'</h2><p>'+moment(date, "DD-MM-YYYY").format("DD MMM YYYY")+'</p></div><img src="'+SERVER_URL+'img/thumbs/'+image+'" width="100%"></a></li>' ;

    };



    
    
}

function post_inner_html(id, date, title, image , content){

    if (image == "default.jpg") {

        return '<div data-role="content"><h1 class="post_headline">'+title+'</h1><img class="post_image" src="static/images/default.jpg"><p class="post_date">DNN Times | '+moment(date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p><p class="post_content">'+content+'</p></div>';

    }else{

        return '<div data-role="content"><h1 class="post_headline">'+title+'</h1><img class="post_image" src="'+SERVER_URL+'img/thumbs/'+image+'"><p class="post_date">DNN Times | '+moment(date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p><p class="post_content">'+content+'</p></div>';

    };

        
}

function feed_init(){
    notif_list = $("#notif_display");
    $.getJSON(SERVER_URL+"public_lib/get_init",function(data){
        display_html = "" ;
        no_of_notif = data.length ;
        for(i=0;i<no_of_notif;i++){
            display_html += new_notif_html(data[i].post_id, data[i].dnn_post_title, data[i].dnn_post_feat_img, data[i].dnn_post_date);
        }
        
        FEED_FIRST = data[0].post_id ;
        FEED_LAST = data[no_of_notif-1].post_id ;
        console.log(FEED_FIRST);
        console.log(FEED_LAST);

        display_html += '<li id="loadMore"><a href="#" onclick="load_more()"><h1>Load more</h1></a></li>';

        notif_list.html(display_html);
        notif_list.listview('refresh');
    });
    
        
}

function load_more(){

    $.getJSON(SERVER_URL+'public_lib/get_next_10/'+FEED_LAST, function(data){
        notif_list = $("#notif_display");
        $('#loadMore').remove();
        notif_list.listview('refresh');
        display_html = "" ;
        no_of_notif = data.length ;
        
        for(i = 0 ; i < no_of_notif ; i++ ){
            display_html += new_notif_html(data[i].post_id, data[i].dnn_post_title, data[i].dnn_post_feat_img, data[i].dnn_post_date) ;
            notif_list.append(display_html);
        }
        
        if(no_of_notif != 0){
            FEED_LAST = data[no_of_notif - 1].post_id;
        }
        
        if(FEED_LAST == 167 ){
            notif_list.append('<li data-theme="b"><h1>No more posts.. </h1></li>');
        }else{
            
            notif_list.append('<li id="loadMore"><a href="#" onclick="load_more()"><h1>Load more</h1></a></li>');
        
        }
        notif_list.listview('refresh');
        $('#footer ul').listview('refresh');

    });

}

function get_post(id){
    post_page = $(".post_page");
    post_page.html('');
    $.getJSON(SERVER_URL+"public_lib/get_news/"+id,function(data){
        no_of_notif = data.length ;
        
        for (i = 0; i < no_of_notif; i++) {
            post_page.html(post_inner_html(data[i].post_id, data[i].dnn_post_date, data[i].dnn_post_title, data[i].dnn_post_feat_img, data[i].dnn_post_content));
        };
        
    
    });
}

function feed_refresh(){

    $.getJSON(SERVER_URL+'public_lib/new_feed/'+FEED_FIRST, function(data){
        
        no_of_notif = data.length ;
        if(data.length == 0 ){
            navigator.notification.alert("No new feeds", app.alertCallback, "DNN Times");
        }else{
        for(i=0; i < no_of_notif ; i++){
            $('#notif_display').prepend('<li data-theme="'+CURRENT_THEME+'"><a class="" id="notif" href="#post" data-transition="slide" onclick="get_post('+data[i].post_id+')"><h4>'+ data[i].dnn_post_title +'</h4><p>'+moment(data[i].dnn_post_date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p></a></li>');
            }
            
            FEED_FIRST = data[0].post_id ;
            $('#notif_display').listview('refresh');
        }
              
    });

}

feed_init();


