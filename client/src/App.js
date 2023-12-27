/*
 * Title: App.js
 * Description: App.js file of Todo app
 * Author: Naimur Rahman
 * Date: 2023-12-21
 *
 */
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <Header />
      <Input />
      <Todos />
    </div>
  );
}

export default App;
