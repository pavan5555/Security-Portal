$(document).ready(function(){  
    //Navigation 

    //Event for Digital Signing
    $("#btn_dsg").on("click",function(){
        $("#maindivcnt").load("digitalsigning.html");
        activate_element(this);
    });

    //Event for Hashing
    $("#btn_hsh").on("click",function(){
        $("#maindivcnt").load("hashing.html");
        activate_element(this);
    });

    //Event for key generation
    $("#btn_gen_key").on("click", function(){
        $("#maindivcnt").load("generate_keys.html");
        activate_element(this);
    });

    //Event for steganography
    $("#btn_steg").on("click", function(){
        $("#maindivcnt").load("steganography.html");
        activate_element(this);
    });

    //Event for watermarking
    $("#btn_wtmark").on("click", function(){
        $("#maindivcnt").load("watermarking.html");
        activate_element(this);
    });

    //digital signing
    $("body").on("click", "#id_digsign_add", function(){
        var inpt_img = $("#id_digsign_cnt_src_fl")[0].files[0];
        if(typeof inpt_img !== "undefined"){
            var formdata = new FormData();
            formdata.append("inpt_digsing_fl", inpt_img);
            $.ajax({
                type: "POST",
                url: "/createDigitalSignature",
                enctype: "multipart/form-data",
                processData: false,
                contentType: false,
                cache: false,
                data: formdata,
                success: function(res){
                    var tempanch = document.createElement("a");
                    tempanch.href = res.dso_sig_fl_buf
                    tempanch.setAttribute("download", inpt_img.name);
                    tempanch.click();
                    $("#id_digsign_key_pub").val(res.dso_pub_key);
                    $("#id_digsign_key_pri").val(res.dso_pri_key);               
                    $("#id_dso_showmsg").text("Time Taken for Digital Signing is "+res.dso_perf+"ms");
                },
                error: function(res){
                    console.log(res);
                }

            });
        }
    
    
    
    });



    //hashing submit
    $("body").on("click", '#id_cal_hash',function(){
        var inpt = $("#id_hsh_inpt").val();
        if (inpt !== ""){
           $.ajax({
                type: "POST",
                url: "/generatehash",
                data: {'data' : inpt},
                dataType: "json", 
            success: function(res){
                $("#id_dis_hash").val(res.hash);
                $("#id_hsh_showmsg").text("Time Taken for Generating Hash is "+res.hash_perf+"ms");
            },
            error: function(res){
                console.log(res)
            }                    
        });
        }
    });

    //key generator submit
    $("body").on("click", '#id_key_gen',function(){  
        $("#id_key_pub").val('');
        $("#id_key_pri").val('');
           $.ajax({
                type: "GET",
                url: "/createKeyPair",
            success: function(res){
                $("#id_key_pub").val(res.public);
                $("#id_key_pri").val(res.private);
                $("#id_key_showmsg").text("Time Taken for Generating Keys is "+res.key_perf+"ms");

            },
            error: function(res){
                console.log(res)
            }                    
        });
    });


    //Hide Content - steganography
    $("body").on("click", '#id_steg_add',function(){  
        var start_time = performance.now();
        var inpt_txt = $("#id_steg_cnt_inpt").val();
        var inpt_img = $("#id_steg_cnt_ig")[0].files[0];
        var reader = new FileReader();
        var dataURL = "";
         reader.onload = function(){
            dataURL = reader.result;
        }
        reader.readAsDataURL(inpt_img);
        setTimeout(function(){
            var tempanch = document.createElement("a");            
            var tempimg = new Image();
            tempimg.src = dataURL;
            tempimg.onload = function(){
                tempanch.href = steg.encode(inpt_txt, dataURL, {'width':tempimg.width, 'height': tempimg.height});
                tempanch.setAttribute("download", inpt_img.name);
                tempanch.click();
                var end_time = performance.now();
                $("#id_steg_enc_showmsg").text(`Time Taken for Hiding is ${end_time - start_time} ms`);
            }
          
        }, 1000);
    });

    //Retrive content - Stegnography
    $("body").on("click", "#id_steg_rt", function(){
        var start_time = performance.now();
        var inpt_img = $("#id_steg_dct_ig")[0].files[0];
        var reader = new FileReader();
        var dataURL = "";
         reader.onload = function(){
            dataURL = reader.result;
        }
        reader.readAsDataURL(inpt_img);
        setTimeout(function(){
            var tempanch = document.createElement("a");            
            var tempimg = new Image();
            tempimg.src = dataURL;
            tempimg.onload = function(){
                $("#id_steg_dct_inpt").val(steg.decode(dataURL, {'width':tempimg.width, 'height': tempimg.height}));
            }
            var end_time = performance.now(); 
            $("#id_steg_dec_showmsg").text(`Time Taken for retrieving is ${end_time - start_time}ms`);
          
        }, 1000);
    });

    //Watermarking Submit
    $("body").on("click", "#id_wtmark_add", function(){
        var inpt_img = $("#id_wtmark_cnt_src_ig")[0].files[0];
        var formdata = new FormData();
        formdata.append("inpt_src_ig", inpt_img);
        $.ajax({
            type: "POST",
            url: "/createWatermark",
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            cache: false,
            data: formdata,
        success: function(res){
            var tempanch = document.createElement("a");
            tempanch.href = res.output
            tempanch.setAttribute("download", inpt_img.name);
            tempanch.click();
            $("#id_wtmark_showmsg").text("Time Taken for Watermarking is "+res.wtmrk_perf+"ms");
        },
        error: function(res){
            console.log(res)
        }                    
    });

    });

    function activate_element(ele){
        $('.activelink').removeClass('activelink');
        $(ele.parentElement).addClass('activelink');
    }

    //auto select first
    $("#btn_dsg").trigger('click');

});


