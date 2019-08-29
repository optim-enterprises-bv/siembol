package uk.co.gresearch.nortem.nikita.common;
import java.util.List;
import java.util.Map;

public class NikitaAttributes {
    private EvaluationResult evaluationResult;
    private String exception;
    private String message;
    private String rulesSchema;
    private Map<String, Object> event;
    private List<Map<String, Object>> outputEvents;
    private List<Map<String, Object>> exceptionEvents;
    private NikitaEngine engine;
    private Integer hourlyMatches;
    private Integer dailyMatches;

    public EvaluationResult getEvaluationResult() {
        return evaluationResult;
    }

    public void setEvaluationResult(EvaluationResult evaluationResult) {
        this.evaluationResult = evaluationResult;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getEvent() {
        return event;
    }

    public void setEvent(Map<String, Object> event) {
        this.event = event;
    }

    public String getRulesSchema() {
        return rulesSchema;
    }

    public void setRulesSchema(String rulesSchema) {
        this.rulesSchema = rulesSchema;
    }

    public NikitaEngine getEngine() {
        return engine;
    }

    public void setEngine(NikitaEngine engine) {
        this.engine = engine;
    }

    public List<Map<String, Object>> getOutputEvents() {
        return outputEvents;
    }

    public void setOutputEvents(List<Map<String, Object>> outputEvents) {
        this.outputEvents = outputEvents;
    }

    public List<Map<String, Object>> getExceptionEvents() {
        return exceptionEvents;
    }

    public void setExceptionEvents(List<Map<String, Object>> exceptionEvents) {
        this.exceptionEvents = exceptionEvents;
    }

    public Integer getHourlyMatches() {
        return hourlyMatches;
    }

    public void setHourlyMatches(Integer hourlyMatches) {
        this.hourlyMatches = hourlyMatches;
    }

    public Integer getDailyMatches() {
        return dailyMatches;
    }

    public void setDailyMatches(Integer dailyMatches) {
        this.dailyMatches = dailyMatches;
    }
}
