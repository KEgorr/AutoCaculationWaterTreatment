import { InlineMath } from 'react-katex';
import { beta_Na } from '../textVariables/symbos';

export default function BetaTable() {
  const split = `\\frac{C^{2}_{Na}}{Ж_o}`;
  return (
    <table className="calc-block__table">
      <tbody>
        <tr>
          <td>
            <InlineMath math={split} />
          </td>
          <td>0.01</td>
          <td>0.02</td>
          <td>0.03</td>
          <td>0.04</td>
          <td>0.05</td>
          <td>0.06</td>
          <td>0.07</td>
          <td>0.08</td>
          <td>0.09</td>
          <td>0.1</td>
          <td>0.2</td>
          <td>0.3</td>
          <td>0.4</td>
          <td>0.5</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={beta_Na} />
          </td>
          <td>0.93</td>
          <td>0.92</td>
          <td>0.91</td>
          <td>0.89</td>
          <td>0.88</td>
          <td>0.87</td>
          <td>0.86</td>
          <td>0.85</td>
          <td>0.84</td>
          <td>0.83</td>
          <td>0.8</td>
          <td>0.77</td>
          <td>0.73</td>
          <td>0.7</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={split} />
          </td>
          <td>0.6</td>
          <td>0.7</td>
          <td>0.8</td>
          <td>0.9</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>10</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={beta_Na} />
          </td>
          <td>0.69</td>
          <td>0.68</td>
          <td>0.67</td>
          <td>0.66</td>
          <td>0.65</td>
          <td>0.62</td>
          <td>0.6</td>
          <td>0.57</td>
          <td>0.54</td>
          <td>0.53</td>
          <td>0.2</td>
          <td>0.2</td>
          <td>0.51</td>
          <td>0.5</td>
        </tr>
      </tbody>
    </table>
  );
}
