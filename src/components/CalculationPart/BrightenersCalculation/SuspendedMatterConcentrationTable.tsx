export default function SuspendedMatterConcentrationTable() {
  return (
    <table className="calc-block__table">
      <thead>
        <tr>
          <th rowSpan={2}>Характеристика осадка</th>
          <th colSpan={6}>Продолжительность уплотнения, ч</th>
        </tr>
        <tr>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>6</th>
          <th>8</th>
          <th>12</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Осадок, образующийся при коагуляции воды с содержанием взвешенных
            веществ, мг/кг:
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>100-400</td>
          <td>16</td>
          <td>19</td>
          <td>22.5</td>
          <td>24</td>
          <td>25</td>
          <td>27</td>
        </tr>
        <tr>
          <td>400-1000</td>
          <td>0</td>
          <td>24</td>
          <td>25</td>
          <td>27</td>
          <td>29</td>
          <td>31</td>
        </tr>
        <tr>
          <td>выше 1000</td>
          <td>24</td>
          <td>29</td>
          <td>31</td>
          <td>33</td>
          <td>35</td>
          <td>37</td>
        </tr>
        <tr>
          <td>
            Осадок, образующийся при известковании воды: с малой (до 25 %)
            магнезиальной жесткостью
          </td>
          <td>30</td>
          <td>35</td>
          <td>37</td>
          <td>39</td>
          <td>40</td>
          <td>41</td>
        </tr>
        <tr>
          <td>
            Осадок, образующийся при известковании воды: с высокой магнезиальной
            жесткостью
          </td>
          <td>6</td>
          <td>8</td>
          <td>10</td>
          <td>12</td>
          <td>15</td>
          <td>17</td>
        </tr>
      </tbody>
    </table>
  );
}
