import { InlineMath } from 'react-katex';
import { alpha_h } from '../../textVariables/symbols';

export default function AlphaTableH() {
  return (
    <table className="calc-block__table">
      <tbody>
        <tr>
          <td>
            Удельный расход серной кислоты на регенерацию катионита, г/г · экв.
          </td>
          <td>50</td>
          <td>60</td>
          <td>70</td>
          <td>80</td>
          <td>90</td>
          <td>100</td>
          <td>110</td>
          <td>120</td>
          <td>130</td>
          <td>140</td>
          <td>150</td>
          <td>200</td>
          <td>250</td>
        </tr>
        <tr>
          <td>
            <InlineMath math={alpha_h} />
          </td>
          <td>0.68</td>
          <td>0,71</td>
          <td>0,75</td>
          <td>0,78</td>
          <td>0,82</td>
          <td>0,85</td>
          <td>0,86</td>
          <td>0,87</td>
          <td>0,89</td>
          <td>0,9</td>
          <td>0,91</td>
          <td>0,92</td>
          <td>0,93</td>
        </tr>
      </tbody>
    </table>
  );
}
