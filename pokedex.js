const fetchPokemon = () => {
    const search = document.getElementById("search");
    let pokeint = search.value;
    pokeint = pokeint.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeint}`;
    fetch(url)
      .then((res) => {
        if (res.status != "200") {
          console.log(res);
          pokeImage("./error.gif");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          let pokeImg = data.sprites.other["official-artwork"].front_default;
          pokeImage(pokeImg);
          console.log(pokeImg);
          let pokeName = data.name;
          let pokeId = data.id;
          let pokeType = data.types.map((type) => type.type.name).join(", ");
          let pokeHeight = data.height;
          let pokeWeight = data.weight;
          let pokeAbilities = data.abilities.map((ability) => ability.ability.name).join(", ");
          let pokeStats = data.stats;
          let pokeMoves = data.moves.map((move) => move.move.name).slice(0, 10);
  
          document.getElementById("pokeName").innerHTML = "Nombre: " + pokeName;
          document.getElementById("pokeId").innerHTML = "ID: " + pokeId;
          document.getElementById("pokeType").innerHTML = "Tipo: " + pokeType;
          document.getElementById("pokeHeight").innerHTML = "Altura: " + pokeHeight;
          document.getElementById("pokeWeight").innerHTML = "Peso: " + pokeWeight;
          document.getElementById("pokeAbilities").innerHTML = "Habilidades: " + pokeAbilities;
          document.getElementById("pokeStats").innerHTML;
          document.getElementById("pokeMoves").innerHTML;
  
          createBarChart(pokeStats);
          createPieChart(data.types);
          createLineChart(pokeMoves);
          createRadarChart(pokeStats);
        }
      });
  };
  
  const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
  };
  
  function createBarChart(stats) {
    const statLabels = stats.map((stat) => stat.stat.name);
    const baseStats = stats.map((stat) => stat.base_stat);
  
    const data = [
      {
        x: statLabels,
        y: baseStats,
        type: "bar",
      },
    ];
  
    const layout = {
      title: "Estadísticas base",
      xaxis: {
        title: "Estadísticas",
      },
      yaxis: {
        title: "Valor",
      },
    };
  
    Plotly.newPlot("chart1", data, layout);
  }
  
  function createPieChart(types) {
    const typeLabels = types.map((type) => type.type.name);
  
    const data = [
      {
        labels: typeLabels,
        type: "pie",
      },
    ];
  
    const layout = {
      title: "Distribución de tipos",
    };
  
    Plotly.newPlot("chart2", data, layout);
  }
  
  function createLineChart(moves) {
    const moveNames = moves;
    const movePower = moves.map(() => Math.floor(Math.random() * 100) + 1);
  
    const data = [
      {
        x: moveNames,
        y: movePower,
        type: "line",
      },
    ];
  
    const layout = {
      title: "Poder de los movimientos",
      xaxis: {
        title: "Movimientos",
      },
      yaxis: {
        title: "Poder",
      },
    };
  
    Plotly.newPlot("chart3", data, layout);
  }
  
  function createRadarChart(stats) {
    const statLabels = stats.map((stat) => stat.stat.name);
    const baseStats = stats.map((stat) => stat.base_stat);
  
    const data = [
      {
        type: "scatterpolar",
        r: baseStats,
        theta: statLabels,
        fill: "toself",
      },
    ];
  
    const layout = {
      title: "Comparación de estadísticas",
      polar: {
        radialaxis: {
          visible: true,
          range: [0, Math.max(...baseStats) + 20],
        },
      },
    };
  
    Plotly.newPlot("chart4", data, layout);
  }
  