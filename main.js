//https://docs.mapbox.com/mapbox-gl-js/example/add-image/
mapboxgl.accessToken = 'pk.eyJ1IjoiYXphcmFzaGkiLCJhIjoiY2t0YmdibXczMXZwbzJubzBnZHI4Ym4zMCJ9.1C3RNiQqSioL1NkDSFE5Xg';
    
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/azarashi/cktbgkxip5jml17n06wvzmgj9',
    center: [139.7670516, 35.6811673],//仮数値
    zoom: 5,//仮数値
    //bounds:addpoint(),
    customAttribution: ['<a href="https://www.jma.go.jp/jma/index.html">震度情報:©︎気象庁</a>', '<a href="https://nlftp.mlit.go.jp/index.html">国土数値情報:©︎国土交通省</a>','<a href="https://twitter.com/nyaonearthquake?s=21">編集:©︎nyaonearthquake</a>']
});

// コントロール関係表示
map.addControl(new mapboxgl.NavigationControl());
// 非同期関数を定義
async function getdata(){
    // 外部からjsonデータを取得
   const res1 = await fetch('https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json')
   const data1 = await res1.json();
   const res2 = await fetch('https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N2.json')
   const data2 = await res2.json();


   return data1
}
// 非同期関数を実行
getdata().then(data => {
    
    // 取得したデータを使用する
    console.log(data);
    console.log(Object.keys(data).length)
    len=Object.keys(data).length

    

    var list=[]
    data.forEach(function(item) {
        list.push(item.basetime);
    });
    list.sort(function(a, b) {
        return a - b;
      });
    
    
    
    console.log(list)



    // 新しいラスターソースを追加
    map.addSource('raster-source-0', {
        type: "raster",
        tiles:  [`https://www.jma.go.jp/bosai/jmatile/data/nowc/${data[36].basetime}/none/${data[36].basetime}/surf/hrpns/{z}/{x}/{y}.png`],
        tileSize: 256
    });
    // 新しいラスターソースを表示するレイヤーを追加
    map.addLayer({
        id: 'raster-source-0',
        type: "raster",
        source: 'raster-source-0'
    });
    var currentSourceId = 'raster-source-0';
    





    //HTMLスライダーにイベントリスナーを追加します
    document.getElementById('slider').addEventListener('input', function(e) {
    //スライダーの新しい値を取得します
    var value = e.target.value;
    // HTMLドキュメントに数値を表示するための要素を取得します
    var output = document.getElementById('out');
     // 取得した値を出力要素に表示します
    output.innerHTML = value;


    map.removeLayer(currentSourceId);
    map.removeSource(currentSourceId);


     // スライダーの値を取得
    var year = list[value];
    var rasterSourceId = `${year}`
    var rasterSourceUrl = [`https://www.jma.go.jp/bosai/jmatile/data/nowc/${list[value]}/none/${list[value]}/surf/hrpns/{z}/{x}/{y}.png`];
    console.log(rasterSourceUrl)
    console.log(rasterSourceId)

    
    currentSourceId = rasterSourceId

    
    // 新しいラスターソースを追加
    map.addSource(rasterSourceId, {
        type: "raster",
        tiles: rasterSourceUrl,
        tileSize: 256
    });
    // 新しいラスターソースを表示するレイヤーを追加
    map.addLayer({
        id: rasterSourceId,
        type: "raster",
        source: rasterSourceId
    });
    

    
    
    






    


    });


  });

