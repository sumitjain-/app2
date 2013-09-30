function new_notif_html(id,title,date,image){

    return '<li><a href="#post" onclick="get_post('+id+')" data-transition="flip"><div class="inside-li"><h2>title</h2><p>date</p></div><img src="'+SERVER_URL+'img/thumbs/thumbs/'+image+'" width="100%"></a></li>' ;
    
}