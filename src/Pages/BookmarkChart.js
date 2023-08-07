import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryLabel } from 'victory';
import { useAuth } from '../Providers/AuthProvider';
import axios from 'axios';
import { useBookmarkContext } from '../Providers/BookmarkProvider';

const BookMarkChart = () => {
    const { user } = useAuth();
    const [daysData, setDayData] = useState([]);
    const [dates, setDates] = useState([]);
    const [counts, setCounts] = useState([]);
    const { bookmarkedRepos } = useBookmarkContext();

    const getUserDateDatas = async () => {
        try {
            let { userId } = user;
            let { data } = await axios.get(`http://localhost:3001/user/repos-stats/${userId}`);
            if (data.error) { }
            else {
                let graphDteials = data.data;
                let datesArray = graphDteials.map(item => item.date);
                let countsArray = graphDteials.map(item => item.count);
                setDates(datesArray);
                setCounts(countsArray);
                setDayData(graphDteials);
            }
        } catch (error) {
            console.log('Error occurred.', error);
        }
    }

    useEffect(() => {
        getUserDateDatas();
    }, [bookmarkedRepos]);

    if (daysData.length === 0) {
        return (
            <div className="columns is-centered">
                <div className="column is-half has-text-centered" style={{ marginTop: '2rem' }}>
                    <p className="has-text-grey-light">You haven't bookmarked anything yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="columns is-centered">
            <div className="column is-half">
                <div>
                    <VictoryChart
                        domainPadding={20}
                    >
                        <VictoryAxis
                            tickValues={counts}
                            tickFormat={dates}
                        />
                        <VictoryAxis
                            dependentAxis
                            domain={[0, 10]}

                            
                        />
                        <VictoryBar
                            data={daysData}
                            x="date"
                            y="count"
                            barWidth={15} // Increase the bar width here
                            style={{
                                data: {
                                    fill: 'rgba(75, 192, 192, 0.6)',
                                },
                            }}
                            labels={({ datum }) => datum.count}
                            labelComponent={<VictoryLabel dy={-20} />}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
    
};

export default BookMarkChart;
