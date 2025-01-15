class pAJAX {
    constructor() {
      this.p = new XMLHttpRequest();
    }
  
    // Defino el método:
    peticion(url, metodo, fRes = null, param = "") {
      metodo = metodo.toUpperCase();
      // Hago una copia (por referencia) del atributo p, para hacerlo público en todo el método:
      var p = this.p;
  
      if (fRes != null) {
        this.p.onreadystatechange = function() {
          if ((this.readyState == 4) && (this.status == 200)) {
            fRes(this.responseText);
          }
        };
      }
  
      if (metodo == "GET") {
        if (param.trim().length > 0) {
          url += "?" + param;
        }
        this.p.open(metodo, url);
        this.p.send(null);
      }
  
      if (metodo == "POST") {
        this.p.open(metodo, url);
        this.p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.p.send(param);
      }
    }
  }
  