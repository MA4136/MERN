import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGitRepos } from '../../actions/profileActions'

const ProfileGithub = ({getGitRepos, repos, userName}) => {

    useEffect(() => {
        getGitRepos(userName)
    }, [getGitRepos, userName])

    return (
        <>
            <h2 className='text-primary my-1'>
                <i className='fab fa-github'></i> {userName} Repos
            </h2>

            {
                repos.length > 0 ? repos.map(el => {
                    return <div key={el._id} className='repo bg-white p-1 my-1'>
                        <div>
                            <h4><a href={el.html_url} target='_blank' rel='noopener noreferrer'>{el.name}</a></h4>
                            <p>{el.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className='badge badge-primary'>Stars: {el.stargazers_count}</li>
                                <li className='badge badge-dark'>Watchers: {el.watchers_count}</li>
                                <li className='badge badge-light'>Forks: {el.forks_count}</li>
                            </ul>
                        </div>
                    </div>
                }) : <div>There is no public repos yet</div>
            }
        </>
    )
}

ProfileGithub.propTypes = {
    getGitRepos: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
}

export default connect(null, {getGitRepos})(ProfileGithub)