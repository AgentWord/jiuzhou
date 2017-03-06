package cn.mutu.land.service;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExcelService {
	@Autowired
	private SessionFactory sessionFactory;

}
