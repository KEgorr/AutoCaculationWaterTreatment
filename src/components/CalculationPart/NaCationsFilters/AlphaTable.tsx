import { InlineMath } from 'react-katex';
import { alpha_e } from '../textVariables/symbols';

export default function AlphaTable() {
  return (
    <table className="calc-block__table">
      <tbody>
        <tr>
          <td>
            Удельный расход соли на регенерацию катионита, г/г · экв. обменной
            способности
          </td>
          <td>120</td>
          <td>130</td>
          <td>140</td>
          <td>150</td>
          <td>160</td>
          <td>170</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={alpha_e} />
          </td>
          <td>0.67</td>
          <td>0.69</td>
          <td>0,72</td>
          <td>0,74</td>
          <td>0,75</td>
          <td>0,77</td>
        </tr>
        <tr>
          <td>
            Удельный расход соли на регенерацию катионита, г/г · экв. обменной
            способности
          </td>
          <td>180</td>
          <td>190</td>
          <td>200</td>
          <td>210</td>
          <td>220</td>
          <td>230</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={alpha_e} />
          </td>
          <td>0,78</td>
          <td>0,80</td>
          <td>0,81</td>
          <td>0,82</td>
          <td>0,83</td>
          <td>0,84</td>
        </tr>
        <tr>
          <td>
            Удельный расход соли на регенерацию катионита, г/г · экв. обменной
            способности
          </td>
          <td>240</td>
          <td>250</td>
          <td>260</td>
          <td>270</td>
          <td>280</td>
          <td>290</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={alpha_e} />
          </td>
          <td>0,85</td>
          <td>0,87</td>
          <td>0,87</td>
          <td>0,88</td>
          <td>0,88</td>
          <td>0,89</td>
        </tr>
        <tr>
          <td>
            Удельный расход соли на регенерацию катионита, г/г · экв. обменной
            способности
          </td>
          <td>300</td>
          <td>310</td>
          <td>320</td>
          <td>330</td>
          <td>340</td>
          <td>350</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={alpha_e} />
          </td>
          <td>0,9</td>
          <td>0,91</td>
          <td>0,92</td>
          <td>0,92</td>
          <td>0,93</td>
          <td>0,94</td>
        </tr>
      </tbody>
    </table>
  );
}
