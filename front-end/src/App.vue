<template>
  <div id="app">
  <div class="site-title"><h1>Joe's Logbook</h1></div>
    <nav class="navbar navbar-expand-lg justify-content-between">
      <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/">View Log</router-link>
            <router-link class="nav-link" to="/add">Add Purchase</router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav-link {
  font-size: 1.5rem;
  color: #b7c1de;
}

.navbar {
  width: 100%;
  background-color: #0b468c;
  padding-bottom: 0;
  padding-top: 0;
  margin-bottom: 10px;
}

.site-title {
  color: #63345e;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 40px;
}

.site-title h1 {
  font-size: 4rem;
}
</style>
