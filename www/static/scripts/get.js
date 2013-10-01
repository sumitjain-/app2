function new_notif_html(id, title, date) {

    return '<li><a href="#post" onclick="get_post('+id+')" data-transition="flip"><div class="inside-li"><h2>'+title+'</h2><p>'+date+'</p></div><img src="static/images/logo.png" width="100%"></a></li>' ;
    
}

function post_inner_html(id, date, title, image , content){
        return '<div data-role="content"><h1 class="post_headline">'+title+'</h1><img class="post_image" src="'+SERVER_URL+'img/thumbs/'+image+'"><p class="post_date">DNN Times | '+date+'</p><p class="post_content">'+content+'</p></div>';
}

function feed_init(){
    notif_list = $("#notif_display");
    $.getJSON(SERVER_URL+"public_lib/get_init",function(data){
        display_html = "" ;
        no_of_notif = data.length ;
        for(i=0;i<no_of_notif;i++){
            display_html += new_notif_html(data[i].post_id, data[i].dnn_post_title, data[i].dnn_post_date);
        }
        
        notif_list.html(display_html);
        notif_list.listview('refresh');
    });
    
        
}

function get_post(id){
    $.getJSON(SERVER_URL+"public_lib/get_news/"+id,function(data){
        no_of_notif = data.length ;
        post_page = $(".post_page");
        for (i = 0; i < no_of_notif; i++) {
            post_page.html(post_inner_html(data[i].post_id, data[i].dnn_post_date, data[i].dnn_post_title, data[i].dnn_post_feat_img, data[i].dnn_post_content));
        };
        
    
    });
}
feed_init();


