
$().ready(function(){
    // animação menu descendo
    // utilizando slide up e down do Jquery para fazer o efeito de transição
    $('.has-intern').each(function(index, obj){
        $(obj).on({
            mouseover : function(e){
                $(obj).find('.inner-list').slideDown();
                        
            },
            mouseleave : function(e){
                $(obj).find('.inner-list').slideUp(); 
            }
        });
    });

    // navegação vertical
    // Fazendo slideup do nav antes da navegação vertical para não causar conflito
    var ids = ['about-page', 'page', 'about-me', 'me', 'objectives', 'languages', 'certificates', 'contact'];
    $('.v-nav').each(function(index, obj){
        $(obj).click(function(e){

            var innerlist;
            if ($(obj).parent('.inner-list').length > 0){
                innerlist = $(obj).parent('.inner-list');
            } else if ($(obj).find('.inner-list').length > 0){
                innerlist = $(obj).find('.inner-list');
            }
            
            $(innerlist).slideUp(200);

            $(innerlist).promise().done(function(){
                $('html,body').animate({
                    scrollTop: $('#'+ids[index]).offset().top
                }, 1500);
            });
            
            // Estava também disparando o evento da li PAI, este comando corrige!!!!!
            e.stopPropagation();
        });
    });

    // script para mudança de certificado pelos botões
    var previousObj;
    $('#certificate').hide();
    $('#c-div div').each(function(i, obj){
        $(obj).find('.btn').each(function(i2, obj2){
            $(obj2).on({
                mouseover : function(){
                    this.style.cursor = 'pointer';
                }, click : function(){
                    var fileimg = 'imagens/certificate/';
                    var filepdf = 'docs/'
                    switch($(obj).attr('id')){
                        case 'c-udemy':
                            fileimg = fileimg + 'udemyc';
                            filepdf = filepdf + 'udemyc';
                            break;
                        case 'c-impacta':
                            fileimg = fileimg + 'impactac';
                            filepdf = filepdf + 'impactac';
                            break;
                        case 'c-coursera':
                            fileimg = fileimg + 'courserac';
                            filepdf = filepdf + 'courserac';
                            break;
                    }
                    fileimg = fileimg + (i2 + 1) + '.jpg';
                    filepdf = filepdf + (i2 + 1) + '.pdf';
                    $('#certificate img').attr('src', fileimg);
                    $('#certificate p').html('PDF File: <a href="' + filepdf + '" target="_blank">Click Here!</a>');

                    if (obj2 == previousObj){
                        $('#certificate').slideToggle();
                        $(obj2).toggleClass('pressed');                
                    } else {
                        $('#certificate').slideDown();
                        $(obj2).addClass('pressed');
                        $(previousObj).removeClass('pressed');
                    }
                    previousObj = obj2;
                }
            });
        });
    });
});
