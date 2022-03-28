import { useCallback, useRef, useState } from 'react';

import Dashboard from '../components/Dashboard';
import { useCallApi } from '../hooks/api';
import { API_BASE_URL, MUNICH_AGS } from '../constants'
import { getLastDates } from '../utils/dateTime';
import { serializeResToArr } from '../utils/serialize';

export default () => {
  const [loading, setLoading] = useState(true);
  const daysRef = useRef(30);
  const districtRef = useRef(MUNICH_AGS);
  const [historyData, setHistoryData] = useState<historyDataInterface>({
    cases: [],
    deaths: [],
    incidence: [],
    dates: []
  });
  const [getCasesHistory] = useCallApi('GET');
  const [getDeathsHistory] = useCallApi('GET');
  const [getIncidencesHistory] = useCallApi('GET');

  const prepareDashboardData = (casesRes: any, deathsRes: any, incidenceRes: any) => {
    const cases = serializeResToArr(casesRes, 'cases', districtRef.current);
    const deaths = serializeResToArr(deathsRes, 'deaths', districtRef.current);
    const incidence = serializeResToArr(incidenceRes, 'weekIncidence', districtRef.current);
    const dates = getLastDates(daysRef.current);

    setHistoryData(prev => ({
      ...prev,
      cases,
      deaths,
      incidence,
      dates
    }));
  }

  const fetchOverviewData = useCallback(async (days: number, district: string) => {
    setLoading(true);
    
    const caseHistory = await getCasesHistory(`${API_BASE_URL}/districts/${district}/history/cases/${days}`);
    const deathsHistory = await getDeathsHistory(`${API_BASE_URL}/districts/${district}/history/deaths/${days}`);
    const incidenceHistory = await getIncidencesHistory(`${API_BASE_URL}/districts/${district}/history/incidence/${days}`);
    
    Promise.all([caseHistory, deathsHistory, incidenceHistory])
    .then(([casesRes, deathsRes, incidenceRes]: Array<any>) => {
        setLoading(false);
        districtRef.current = district;
        daysRef.current = days;
        prepareDashboardData(casesRes, deathsRes, incidenceRes);
    });
  }, [])

  const setOverviewDays = (days: number) => fetchOverviewData(days, districtRef.current);
  const setOverviewDistrict = (district: string) => fetchOverviewData(daysRef.current, district);

  return <Dashboard 
      loading={loading}
      fetchOverviewData={fetchOverviewData}
      setOverviewDays={setOverviewDays}
      setOverviewDistrict={setOverviewDistrict}
      cases={historyData?.cases}
      deaths={historyData?.deaths}
      incidence={historyData?.incidence}
      dates={historyData.dates}
    />
}

interface historyDataInterface {
  cases: number[];
  deaths: number[];
  incidence: number[];
  dates: string[];
}
