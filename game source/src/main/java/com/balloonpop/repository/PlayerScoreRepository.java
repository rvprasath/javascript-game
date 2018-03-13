package com.balloonpop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.balloonpop.domain.PlayerScore;

/**
 * @author vishnu
 *
 */
public abstract interface PlayerScoreRepository extends JpaRepository<PlayerScore, Integer> {

	/**
	 * find PlayerScore by random number
	 * 
	 * @param paramDouble
	 * @return PlayerScore
	 */
	public abstract PlayerScore findByRandomNumber(Double paramDouble);
}