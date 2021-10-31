<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
<!--      {{ip_address}}-->
      <h1>{{title}}</h1>
      {{ label_tasa_vzla }}
      <input  v-model="tasa_vzla">
      {{ label_tasa_externa }}
      <input v-model="tasa_externa">
      {{ label_monto_esperado }}
      <input v-model="monto_esperado">
      {{ label_monto_vender }}
      <input v-model="monto_vender">
      <button class="submit">Convert</button>
    </form>
    <button class="small-b" @click="clean()">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'form-exchange',
  props: {
    msg: String
  },
  data(){
    return {
      title: 'Vzla Money Converter',
      tasa_vzla: 0.0, //4.34,
      label_tasa_vzla: 'Tasa Venezuela',
      tasa_externa: 0.0,//3.95,
      label_tasa_externa: 'Tasa Externa',
      label_monto_esperado: 'Monto Esperado',
      monto_esperado: 0.00,
      label_monto_vender: 'Monto necesario a vender',
      monto_vender: 0.00,
      ip_address: ''
    }
},
  methods: {
    getIpAddress() {
      fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(({ ip }) => {
            this.ip_address = ip;
            this.getTasas(ip);
            console.log("mounted ---")
          });
    },
     clean() {
      this.monto_esperado = 0.0;
      this.monto_vender = 0.0;
    },
    isTasaValid: function () {
      return this.tasa_vzla > 0 && this.tasa_externa > 0;
    }, handleSubmit() {

      if (this.isTasaValid()) {
        this.monto_vender = (this.monto_esperado * this.tasa_vzla / this.tasa_externa).toFixed(2);
        console.log('tasa_vzla ' + this.tasa_vzla);
        console.log('tasa_externa ' + this.tasa_externa);
        console.log('monto_esperado ' + this.monto_esperado);
        console.log('monto_vender ' + this.monto_vender);
        this.saveTasas(this.tasa_vzla, this.tasa_externa, this.ip_address);
      }

    }, saveTasas(tasa_vzla, tasa_externa, ip_address) {
      let dato= {
        "vzlRate": tasa_vzla,
        "TicoRate": tasa_externa,
        "ipAddress": ip_address
      }

      // console.log(dato);
        fetch(process.env.VUE_APP_ROOT_API+'/v1/exchange', {
        method: 'post',
        headers: {
          Accept: 'application/json',
           'content-type': 'application/json'
        },
        body: JSON.stringify(dato)
      }).then(res => {
        // a non-200 response code
        if (!res.ok) {
          // create error instance with HTTP status text
          const error = new Error(res.statusText);
          error.json = res.json();
          throw error;
        }
        console.log(res);
      });

    }, getTasas(ip_address) {
      fetch(process.env.VUE_APP_ROOT_API+'/v1/exchange/' + ip_address, {
        method: 'get',
        headers: {
          // Accept: 'application/json',
          // 'content-type': 'application/json'
        }
      }).then(res => {
        // a non-200 response code
        if (!res.ok) {
          // create error instance with HTTP status text
          const error = new Error(res.statusText);
          error.json = res.json();
          throw error;
        }
        return res.json();
      }).then(res => {
        // console.log('response: '+JSON.stringify(res))
        this.tasa_vzla = res.vzlRate;
        this.tasa_externa = res.ticoRate;
      })

    }

  },mounted() {
    if (this.ip_address === '') {
      this.getIpAddress();

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container{
  width: 400px;
}

form {
  display: flex;
  border: 1px solid #ddd;
  flex-direction: column;
  padding: 20px;

}

input {
  margin: 15px 0;
  padding: 10px;   /*padding iside the input*/
  /*width: 100px;*/

}

.small-b{
  margin: 15px 0;
  padding: 10px;   /*padding iside the input*/
}

.submit {
  padding: 10px;
  background-color: gray;
  color: white;
  border: 0;
}
</style>
