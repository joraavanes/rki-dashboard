import React, { useEffect } from 'react';

import Linechart from '../Linechart';
import Spinner from '../Spinner';
import { DISTRICTS, MUNICH_AGS } from '../../constants';
import Card from '../Card';

const Dashboard: React.FC<AppProps> = ({ 
  fetchOverviewData,
  setOverviewDays,
  setOverviewDistrict,
  loading,
  cases,
  incidence,
  deaths,
  dates
 }) => {
  
  const handleDaysChange = (e: { target: HTMLSelectElement; }) => 
    setOverviewDays(+e.target.value);
  
  const handleDistrictChange = (e: { target: HTMLSelectElement; }) => 
    setOverviewDistrict(e.target.value);

  useEffect(() => {
    fetchOverviewData(30, MUNICH_AGS);
  }, []);

  return (
    <div>
      <h1>RKI Dashboard</h1>
      <div className="row mt-4">
        <div className="col">
          <div className="row">
            <div className="col">
              <select name="districts" id="districts" className="form-select" title="districts"  onChange={handleDistrictChange} defaultValue="09162">
                {DISTRICTS.map(d => <option value={d.ags} key={d.ags}>{d.name}</option>)}
              </select>
            </div>
            <div className="col">
              <select name="days" id="days" className="form-select" onChange={handleDaysChange}>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="180">Last 6 months</option>
              </select>
            </div>
        </div>
        </div>
        <div className="col-4">
        {loading && <Spinner/>}
        </div>
      </div>
      
        <Linechart
          cases={cases}
          deaths={deaths}
          incidence={incidence}
          dates={dates}
        />
      
      <div className="row mt-4">
        <Card stats={cases} title="cases" theme="danger"/>
        <Card stats={deaths} title="deaths" theme="warning"/>
        <Card stats={incidence} title="incidence" theme="primary"/>
        </div>
        <div className="row">
          <div className="col">
            <div className="card border-secondary mb-3">
              <div className="card-body text-secondary">
                <p className="card-text">High: </p>
                <h4 className="card-title">
                  Cases: {cases.length && Math.max(...cases)}
                </h4>
                <h4 className="card-title">
                  Deaths: {deaths.length && Math.max(...deaths)}
                </h4>
                <h4 className="card-title">
                Incidences: {incidence.length && Math.max(...incidence).toFixed(0)}
                </h4>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary mb-3">
              <div className="card-body text-secondary">
                <p className="card-text">Low: </p>
                <h4 className="card-title">
                  Cases: {cases.length && Math.min(...cases)}
                </h4>
                <h4 className="card-title">
                  Deaths: {deaths.length && Math.min(...deaths)}
                </h4>
                <h4 className="card-title">
                Incidences: {incidence.length && Math.min(...incidence).toFixed(0)}
                </h4>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

interface AppProps {
  fetchOverviewData: (days: number, district: string) => any;
  setOverviewDays: (days: number) => any;
  setOverviewDistrict: (district: string) => any;
  loading: boolean;
  cases: number[];
  incidence: number[];
  deaths: number[];
  dates: string[];
}

export default Dashboard;
