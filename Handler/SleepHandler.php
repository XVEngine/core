<?php

namespace XVEngine\Core\Handler;



class SleepHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "sleep";

    
    /**
     *
     * @var int
     */
    public $timeout;


    /**
     *
     * @var string 
     */
    public $id;


    /**
     * @param int $ms
     */
    public function __construct($ms = 10) {
        $this->setTimeout($ms);
        $this->setID(uniqid());
    }
    
    
    /**
     * 
     * @param int $ms
     * @return AntiFlooderHandler
     */
    public function setTimeout($ms){
        $this->timeout = (int) $ms;
        return $this;
    }
    

    
    
    /**
     * 
     * @param string $id
     * @return AntiFlooderHandler
     */
    public function setID($id){
        $this->id = $id;
        return $this;
    }
    
    

    /**
     * 
     * @return mixed[]
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            'timeout' => $this->timeout,
            'id' => $this->id
        );
    }

}
