package com.ixtx.projectmoviesq.mappers;

import com.ixtx.projectmoviesq.entities.MovieEntity;
import com.ixtx.projectmoviesq.entities.ScheduleEntity;
import com.ixtx.projectmoviesq.entities.ScreenEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ScheduleMapper {

    //스케쥴 불러오기
    ScheduleEntity getSchedule(int index);

    //스케쥴 추가
    void insertSchedule(ScheduleEntity schedule);

    //스케쥴 삭제
    int deleteSchedule(@Param(value = "index") int index);

    //스케쥴 수정
    int updateSchedule(ScheduleEntity movieSchedule);

    //단순 스크린 전체 불러오기
    List<ScreenEntity> getAllScreens();
    List<MovieEntity> getAllMovies();
}
