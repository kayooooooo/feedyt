// Função para fazer uma requisição AJAX para a API do YouTube e processar os resultados
function buscarVideosShorts() {
  var chaveApi = 'AIzaSyDi4ijvupolUUlVqJxZwsVpso69cSIpn6Q';
  var maxResultados = 25; // Número máximo de vídeos curtos a serem buscados
  
  //A principal
  var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResultados + '&q=shorts&type=video&key=' + chaveApi;
  

  // Fazer a requisição AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('GET', urlApi, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var resposta = JSON.parse(xhr.responseText);
        var videos = resposta.items;
        var feedHtml = '';

        var videosAdicionados = 0;
        
        // Processar os resultados da API do YouTube
        for (var i = 0; i < videos.length; i++) {
          var video = videos[i];
          var videoId = video.id.videoId;
          var titulo = video.snippet.title;
          var descricao = video.snippet.description;
          var imagem = video.snippet.thumbnails.medium.url;

          // Criar o código de incorporação do vídeo
          //var videoEmbed = '<iframe width="280" height="498" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
          
          // Criar o código de incorporação do vídeo com proporção de 9:16 (vertical) e CSS responsivo
          var videoEmbed = '<div class="video-embed-container">' + '<iframe src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>' + '</div>';

          // Criar o HTML para exibir o vídeo no feed
          //var videoHtml = '<div class="video-item">' + videoEmbed + '</div>';

            if ((videosAdicionados + 1) % 3 === 0) {
            	// Adicionar o HTML do anúncio
            	feedHtml += '<div class="anuncio-item"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9071159750948981" data-ad-slot="5631823871" data-ad-format="auto" data-full-width-responsive="true"></ins></div>';
          	} else {
            	// Adicionar o HTML do vídeo
            	feedHtml += '<div class="video-item">' + videoEmbed + '</div>';
            }
          videosAdicionados++;
          
          //feedHtml += videoHtml;
        }

        // Exibir o feed de vídeos curtos no Blogger
        // Exibir o feed de vídeos curtos no Blogger
  		var meuFeedDeVideosCurto = document.getElementById('meu-feed-de-videos-curto');
  		meuFeedDeVideosCurto.innerHTML = feedHtml;

  		// Iniciar o carrossel com os vídeos retornados pela API do YouTube
  		$('#meu-feed-de-videos-curto').slick({
          dots: true, // Exibir pontos de navegação
          arrows: true, // Exibir setas de navegação
          prevArrow: '<button type="button" class="slick-prev">Anterior</button>', // Elemento HTML para o botão de anterior
          nextArrow: '<button type="button" class="slick-next">Próximo</button>', // Elemento HTML para o botão de próximo
          autoplay: false, // Iniciar a reprodução automática
          autoplaySpeed: 5000, // Intervalo de tempo entre os slides (em milissegundos)
          slidesToShow: 1, // Quantidade de slides a serem exibidos ao mesmo tempo
          slidesToScroll: 1 // Quantidade de slides a serem avançados/retrocedidos a cada vez
        });
        
      } else {
        console.error('Erro ao buscar vídeos curtos do YouTube. Código de status: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

  // Chamar a função para buscar e incorporar os vídeos curtos ao carregar a página
  buscarVideosShorts();
